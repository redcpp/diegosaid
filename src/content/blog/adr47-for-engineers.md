---
title: ADR-47 for Software Engineers
subtitle: How to review a token-economics proposal the way you review a pull request. Find the invariant, walk the pointer, write the failing test.
excerpt: The same argument as the formal ADR-47, with no theorems. A stablecoin proposal asked for a bypass around the solvency invariant. Forty lines of Python show why the bypass was a reference cycle, and what the failing test looks like.
date: 2026-09-07
readMinutes: 10
tags:
  - DeFi
  - Code Review
  - Invariants
  - Python
---

In 2022 I was a core developer on xBacked, which issued xUSD, an over-collateralized stablecoin on Algorand. A partner, Pact, proposed a mechanism to seed a PACT/xUSD liquidity pool for its token launch. I wrote the architecture decision record against it, ADR-47, and the launch did not happen in that form. The [formal version](/blog/adr47) has the proofs. This one has the code.

If you have reviewed a pull request that added a "temporary" bypass around a validation check, you already know the shape of the argument.

## The invariant

xUSD had one rule that everything else depended on. Every vault holds collateral $C$ and debt $D$ in xUSD, and the contract refuses any operation that would leave

$$
\frac{C}{D} < \mathrm{cr}
$$

where $\mathrm{cr}$ was 1.10. Summed over all vaults, that rule is what makes "1 xUSD is worth a dollar" a claim about assets rather than a hope. Everything a keeper does, every liquidation and every redemption, exists to restore this invariant when the price moves against it.

In code terms: `mint()` is only callable from inside a vault, after `deposit()`, and it checks the ratio. There was no other code path that created xUSD.

## The proposal, as a diff

The partner's proposal, stripped of the deck, was four steps.

1. Pact sends $x$ PACT tokens to xBacked.
2. xBacked mints $y$ xUSD **without a vault and without collateral**.
3. xBacked deposits both into a constant-product AMM pool and receives LP tokens.
4. The LP tokens are declared the backing for the $y$ xUSD from step 2.

Step 2 is a new privileged code path: a `mint()` that skips the ratio check. Step 4 is the comment on the pull request explaining why that is fine. The review question is whether the comment is true.

## "Backed by" is a pointer

When someone says asset $A$ is backed by asset $B$, they are giving you a pointer. Backing is only meaningful if you can follow the pointer chain to something outside the system: dollars in a bank, a token that trades on its own, collateral someone else contributed. Call those the roots.

A garbage collector decides an object is alive only if it is reachable from a root. Two objects pointing at each other with no root reachable are garbage, however many references they hold. The proposal's pointer chain was:

```text
y xUSD  ──backed by──▶  LP tokens
LP tokens  ──claim on──▶  pool reserves
pool reserves  =  x PACT  +  y xUSD
```

Follow it. The LP tokens are a claim on the pool. The pool holds two things: the PACT, which is a root, and the xUSD that we minted in step 2, which is the thing we are trying to back. Half of the backing is a reference back to the liability itself.

Once you see that, the question becomes quantitative: after deleting the self-reference, how much is left, and is it enough?

## Write the invariant as a function

Everything in ADR-47 follows from one function. It computes what an LP share can actually redeem for, counting only assets that came from outside.

```python
def real_value(share, external_assets):
    """What an LP share can redeem for, counting only assets that came from outside."""
    return share * external_assets
```

The word doing the work is `external_assets`. The pool's nominal value includes our own minted xUSD. The real value does not. Every result below is this function applied to a different pool state.

## Test 1: the issuer is the only LP

The simplest case. xBacked creates the pool, so it owns 100% of the LP tokens. For the pool to open at PACT's market price, the xUSD side must equal the PACT side in dollars, so $y = p\,x$.

```python
P = 1.00           # PACT launch price, dollars
X = 1_000_000      # PACT allocated by the partner
Y = P * X          # xUSD minted from nothing so the pool opens at price P

pool_total = P * X + Y
external = P * X                      # the xUSD in the pool is our own liability
issuer_share = (P * X + Y) / pool_total
backing = real_value(issuer_share, external)

assert backing >= Y                   # passes, with zero margin
assert backing > Y, "no buffer"       # fails
```

```text
sole LP: minted=1,000,000 real backing=1,000,000 buffer=0
AssertionError: no buffer
```

The first assertion passes. It is also the assertion the proposal's authors had in mind, and it passes by construction: at launch you get back exactly the PACT you were given. The second one is the one that matters. A stablecoin vault requires collateral above the debt, not equal to it. This position is the equivalent of a vault at 100% loan-to-value. Any decline in PACT's price, at all, leaves xUSD in circulation with nothing behind it.

If you had proposed opening a regular vault with \$1M of PACT and minting \$1M of xUSD against it, the contract would have rejected the transaction. The LP wrapper is the same position with the check removed.

## Test 2: other people are already in the pool

Now suppose the pool already existed and external liquidity providers had \$3M in it. xBacked adds its \$1M of PACT plus \$1M of minted xUSD and receives a 40% share.

```python
V0 = 3_000_000                        # value external LPs contributed earlier
pool_total = V0 + P * X + Y
external = V0 + P * X
issuer_share = (P * X + Y) / pool_total
lp_share = V0 / pool_total

issuer_real = real_value(issuer_share, external)
lp_real = real_value(lp_share, external)
```

```text
shared: issuer backing=1,600,000  external LPs 3,000,000 -> 2,400,000
```

The issuer's backing went up, from \$1.0M to \$1.6M. That looks like the shared pool fixed the problem. Look at the second number. The external LPs contributed \$3.0M and can now redeem \$2.4M. The \$600k of extra backing the issuer gained is exactly the \$600k the external LPs lost.

Nothing on chain marks the difference. An LP token is an LP token. The external providers cannot see, from pool state alone, that 20% of the reserves they share are someone's unbacked liability. The mechanism dilutes them silently and by an amount that scales with the mint.

In review terms: the new code path passes its own test by writing to memory that belongs to another caller.

## Test 3: the price moves

Tests 1 and 2 are snapshots at launch. Newly launched tokens do not hold their launch price. The pool is a constant-product AMM, so arbitrage moves the reserves until the pool's price matches the market. If PACT falls to a fraction $r$ of its launch price, the reserves go to

$$
R_{\mathrm{PACT}} = \sqrt{k / r}, \qquad R_{\mathrm{xUSD}} = \sqrt{k \cdot r}, \qquad k = x_0\, y_0.
$$

When the issuer redeems its LP tokens, it gets both reserves. The xUSD it can burn directly. The PACT it can sell at the new price and use the proceeds to buy and burn more xUSD.

```python
from math import sqrt

def retirable(r, x0=X, y0=Y):
    """xUSD the issuer can burn after redeeming its LP tokens at price ratio r."""
    k = x0 * y0
    reserve_y = sqrt(k * r)           # arbitrage sets reserves so price = r
    reserve_x = sqrt(k / r)
    burn_direct = reserve_y
    burn_from_sale = reserve_x * (P * r)
    return burn_direct + burn_from_sale

for r in (1.0, 0.5, 0.25, 0.10, 0.01):
    got = retirable(r)
    print(f"r={r:<5} retirable={got:>12,.0f}  covered={'yes' if got >= Y else 'NO '} ({got / Y:.2f}x)")
```

```text
r=1.0   retirable=   2,000,000  covered=yes (2.00x)
r=0.5   retirable=   1,414,214  covered=yes (1.41x)
r=0.25  retirable=   1,000,000  covered=yes (1.00x)
r=0.1   retirable=     632,456  covered=NO  (0.63x)
r=0.01  retirable=     200,000  covered=NO  (0.20x)
```

Both terms simplify to $y_0\sqrt{r}$, so the issuer can retire $2\sqrt{r}$ times its mint. That is at least 1 only while $r \ge 0.25$. A 75% drawdown is the line. Below it, the mechanism has created xUSD that no amount of unwinding can remove from circulation, and every other xUSD holder is a little less backed than the contract promised them.

A 75% drawdown in a token's first year is not a corner case. It is closer to the median.

## The review comment

The point of a review is not to say no. It is to say what would pass. The partnership's actual goal, using xBacked's balance sheet to give PACT liquidity and a price, was reasonable. The fix was to route it through the code path that already existed.

Open a vault. Deposit the PACT as collateral. Mint xUSD against it at a collateralization ratio that reflects how volatile a new token is, which is to say a high one. Every property the proposal lacked comes for free:

- The ratio is public and per-vault. Anyone can check the backing.
- The existing liquidation engine handles a drawdown. No special-case code.
- No external LP and no other vault holder is quietly conscripted as backing.
- The price risk sits with the vault owner, which is the partner, where it belongs.

The vault mints less xUSD for the same PACT. That is not a bug in the alternative. It is the buffer the proposal was trying to skip.

## What generalizes

**Every "backed by" is a pointer. Walk it to a root.** If the chain passes through the thing being backed, the backing is a cycle, and a cycle is worth exactly its external content.

**Nominal and real are different fields.** The pool's total value and the pool's external value were both available on chain. The proposal quoted the first. The invariant needs the second. Most economic-mechanism bugs I have seen are a confusion between these two numbers.

**The failing test is the argument.** The proposal had momentum and a meeting was not going to stop it. The three tests above fit in forty lines and took an afternoon. Once they existed, the discussion was about whether the model was right, not about whether the concern was valid. It was, and the model was.

**Never special-case the invariant.** A privileged path around a solvency check is not a partnership feature. It is the one change the contract was written to prevent. When a request needs a bypass to work, the request is the problem, not the check.
