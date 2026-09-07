---
title: "ADR-47: The Case Against the Pact xUSD Launch"
subtitle: LP tokens cannot back the stablecoin that was minted to create them. Three short proofs, and the launch that did not happen.
excerpt: In early 2022 a partner proposed minting xUSD with no collateral and declaring the resulting LP tokens the backing. Three short proofs showed the backing was circular, the losses were someone else's, and a 75% drawdown made the issuer insolvent.
date: 2026-09-07
readMinutes: 13
tags:
  - DeFi
  - Stablecoins
  - AMM
  - Algorand
---

In February 2022 I was a core developer at xBacked DAO, the issuer of xUSD, an over-collateralized stablecoin on Algorand. Pact, a DEX on the same chain, was preparing its token launch and proposed a way to seed a PACT/xUSD pool with the protocol's help. The proposal was popular: deep paired liquidity for a partner from day one, at no visible cost.

ADR-47 was the architecture decision record arguing against it. The argument fits on a few pages and needs nothing beyond algebra. The launch did not go ahead in the proposed form. This post reconstructs the argument as I would write it today.

## The proposal

Let $X$ be the partner token and $Y$ the stablecoin. The mechanism had four steps.

1. The partner transfers $x$ units of $X$ to the issuer.
2. The issuer mints $y$ units of $Y$ **without depositing collateral in any vault**.
3. The issuer supplies $(x, y)$ to a constant-product AMM and receives LP tokens.
4. The LP tokens from step 3 are declared the on-chain backing for the $y$ minted in step 2.

Every xUSD in circulation was supposed to sit against collateral in a vault with a public collateralization ratio. Step 2 breaks that rule, and step 4 is the justification: the mint is not unbacked, it is backed by the LP position. The question is whether that sentence means anything.

## What "backed" has to mean

Write $p$ for the launch price of $X$ in dollars and take $Y$ at par. Let $V_0 \ge 0$ be the dollar value already in the pool from other liquidity providers before the issuer joins. After the issuer's contribution the pool holds

$$
V = V_0 + px + y,
$$

and the issuer's share of it is $\beta = (px + y)/V$. The LP tokens the issuer receives have nominal value $\beta V$.

The problem is that $V$ counts the $y$ that the LP tokens are supposed to back. The value that can actually be redeemed for something external to the mechanism is

$$
V^{\mathrm{real}} = V_0 + px,
$$

which excludes the unbacked mint. So there are two versions of the backing claim:

$$
\text{nominal:}\quad y \le \beta V, \qquad\qquad \text{real:}\quad y \le \beta V^{\mathrm{real}}.
$$

The whole analysis is the gap between these two inequalities.

## Result 1. Sole LP: the claim is vacuous

Suppose the issuer creates the pool, so $V_0 = 0$ and $\beta = 1$. The nominal claim becomes

$$
y \le px + y,
$$

which is true for every $y$. It bounds nothing. Under this reading the issuer could mint any amount of $Y$ and call it backed.

The real claim becomes $y \le px$. For the pool to open at the external price, the two sides must balance, so $y = px$ exactly. At that point, redeeming the LP tokens returns $x$ units of $X$ worth $px$, plus $y$ units of $Y$ that the issuer can burn against its own mint. The net external value recovered is $px$: precisely what the partner deposited, and nothing more. The mint is "collateralized" only in the sense that the issuer's own freshly created $Y$ retires the issuer's own debt.

Strip away the LP wrapper and this is the issuer accepting $X$ as collateral at 100% loan-to-value with zero liquidation buffer. Any decline in $p$ produces an equal shortfall.

## Result 2. Shared pool: the backing is other people's money

Now let $V_0 > 0$, so $0 < \beta < 1$. Each LP token nominally claims a share of $V$, but only $V^{\mathrm{real}}/V$ of every claim is real. The issuer's real LP value is

$$
\beta V^{\mathrm{real}} = \frac{px + y}{V}\,(V - y) = px + y - \frac{(px+y)\,y}{V} = px + (1-\beta)\,y.
$$

The real backing condition $y \le px + (1-\beta)y$ simplifies to

$$
y \le \frac{px}{\beta}.
$$

This looks like an improvement over Result 1: with a smaller share the issuer can mint more. Look at where the extra backing comes from. The external LPs hold the remaining $1 - \beta = V_0/V$ of the pool, and their real value is

$$
(1-\beta)\,V^{\mathrm{real}} = \frac{V_0}{V}(V - y) = V_0 - (1-\beta)\,y.
$$

They contributed $V_0$ and now hold $V_0 - (1-\beta)y$. The issuer's backing above $px$ is exactly the amount transferred out of the external LPs' position. As $\beta \to 0$ the issuer can mint without bound, and the transfer approaches the entire mint.

The transfer is silent. Nothing on chain distinguishes the issuer's unbacked $y$ from any other LP's $y$. External providers entered a public pool assuming every reserve was contributed value, and their dilution accrues automatically as a function of pool balances.

## Result 3. Large allocations dilute vault holders

If neither the LP position nor the external LPs can cover the mint, the last source on the issuer's balance sheet is its free float: the collateral headroom above the system's minimum ratio,

$$
\mathrm{FF} = \frac{\mathrm{TVL}}{\mathrm{cr}} - \sum Y + \text{accrued fees}.
$$

This is the buffer that absorbs shocks without triggering liquidations. For any fixed $\mathrm{FF}$ and price $p$, an allocation of $x^* = \mathrm{FF}/p$ tokens is the threshold beyond which $y = px > \mathrm{FF}$. Written as a fraction $\lambda$ of the partner's max supply, with fully diluted market cap $M_X$, the mint exceeds the free float whenever $\lambda > \mathrm{FF}/M_X$. For any partner whose market cap exceeds the issuer's free float, that threshold is reachable.

Beyond it, the mechanism creates uncollateralized supply that every existing vault holder subsidizes through a lower global collateralization ratio, without any of them having agreed to anything.

## After launch: the $2\sqrt{r}$ curve

The three results above assume $X$ is fairly priced at launch. Now let the price move. In a constant-product pool with reserves $(R_X, R_Y)$ and invariant $R_X R_Y = K$, arbitrage keeps the pool price equal to the external price. In the sole-LP case, $K = x_0 y_0$ and $y_0 = p x_0$. If the external price becomes $p r$ for some ratio $r$, the reserves become

$$
R_X = \frac{x_0}{\sqrt{r}}, \qquad R_Y = y_0 \sqrt{r}.
$$

Redeeming the LP tokens gives the issuer $y_0\sqrt{r}$ of $Y$ to burn directly, plus $x_0/\sqrt{r}$ of $X$ that sells for $p r \cdot x_0/\sqrt{r} = y_0 \sqrt{r}$ dollars, enough to buy back and burn another $y_0\sqrt{r}$. Total retirable supply is $2\sqrt{r}\,y_0$. The issuer can fully retire the mint only when

$$
2\sqrt{r} \ge 1 \quad\Longleftrightarrow\quad r \ge \tfrac{1}{4}.
$$

| Price ratio $r$ | Retirable $Y$ (units of $y_0$) | Residual unbacked supply |
|---:|---:|---:|
| 1.00 | 2.00 | none, and $y_0$ of surplus |
| 0.50 | 1.41 | none |
| 0.25 | 1.00 | none, with zero margin |
| 0.10 | 0.63 | 37% of the mint |
| 0.01 | 0.20 | 80% of the mint |

A 75% drawdown in a newly launched token is not a tail event. Below it, a fraction $1 - 2\sqrt{r}$ of the original mint circulates with nothing behind it. The curve is concave, so coverage degrades faster the further the price falls.

Compare a plain vault that accepts $X$ as collateral at minimum ratio $\mathrm{cr}$. It mints $px/\mathrm{cr}$ and liquidates at $r = 1/\mathrm{cr}$. A vault at $\mathrm{cr} = 4$ tolerates the same 75% drawdown as the LP mechanism but mints a quarter as much. The LP mechanism's apparent advantage, more mint for the same tolerance, is paid for by Results 2 and 3: the shortfall lands on external LPs or on unrelated vault holders.

## The alternative

The economic content of the partnership was legitimate: extend the issuer's balance sheet to support $X$'s liquidity and price discovery. A smart vault accepting $X$ as standard collateral does that without the circularity.

- Collateral and debt sit on the issuer's balance sheet with a public per-vault ratio.
- The existing liquidation engine handles it. No special-case code.
- No external LP or unrelated vault holder is conscripted as backing.
- Price risk on $X$ is borne by the vault owner, which in this case is the partner.

The vault is worth opening only if $X$'s price can be oracled with confidence, its collateralization ratio exceeds $1/r_{\mathrm{worst}}$ for a conservative bound on drawdowns over the liquidation window, and expected fee revenue covers expected bad debt under fat tails. ADR-47 stopped there. Sizing those parameters was a separate record.

## What I took from it

**Write the balance sheet before the mechanism.** Every step of the proposal was individually reasonable. The circularity only appears when you write down what is real and what is nominal on both sides of the ledger.

**"Backed by" is a claim about redemption, not about custody.** Holding an asset that references your own liability is not backing. Three months after ADR-47, Terra's UST, whose backing asset derived its value from demand for UST itself, lost its peg. The mechanisms differ, but the structural fault is the same one: a reference cycle where an external asset should be.

**A proof settles what a meeting cannot.** The proposal had momentum and the counterargument was unpopular. Writing the nominal and real inequalities side by side moved the discussion from opinion to arithmetic, and the arithmetic did not have a second side.
