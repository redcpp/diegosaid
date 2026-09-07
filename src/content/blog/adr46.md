---
title: "ADR-46: Vault Looping in Closed Form"
subtitle: Recursive minting through a money market is a geometric series. The series says the strategy is a carry trade, not leverage, and that its risk lands on someone else.
excerpt: How far can a user push leverage by minting xUSD, lending it, borrowing collateral, and minting again? A geometric series gives the cap, shows the net exposure never changes, and locates the liquidation risk on unlevered users.
date: 2026-09-07
readMinutes: 13
tags:
  - DeFi
  - Stablecoins
  - Leverage
  - Algorand
---

Once xUSD was listed on Folks Finance, Algorand's main lending market, a predictable strategy became available: mint xUSD against collateral, lend the xUSD, borrow more collateral against it, and mint again. Users on other chains had been doing this with DAI and Aave for years. ADR-46 asked two questions before anyone at xBacked had to answer them in a hurry. How much leverage does the loop actually produce, and who ends up holding the risk?

Both answers came out of one page of algebra. This post is that page, expanded.

## The loop

Fix two parameters: $\mathrm{cr} > 1$, the issuer's minimum collateralization ratio, and $0 < \mathrm{LTV} < 1$, the loan-to-value the external market allows against xUSD. Start with collateral $C_0$ in dollars. One iteration is four transactions.

1. Mint $\mathrm{xUSD}_n = C_n / \mathrm{cr}$ against the collateral just deposited.
2. Supply that xUSD to the money market.
3. Borrow collateral worth $\mathrm{LTV} \cdot \mathrm{xUSD}_n$ against it.
4. Deposit the borrowed collateral back into the vault. That deposit is $C_{n+1}$.

With the parameters xBacked and Folks used at the time, $\mathrm{cr} = 1.20$ and $\mathrm{LTV} = 0.80$, a \$1,000 deposit mints 833 xUSD, which borrows 667 of collateral, which mints 556 xUSD, and so on.

## The recursion

Each deposit is a fixed fraction of the previous one:

$$
C_{n} = \mathrm{LTV} \cdot \frac{C_{n-1}}{\mathrm{cr}} = \alpha\, C_{n-1}, \qquad \alpha = \frac{\mathrm{LTV}}{\mathrm{cr}}.
$$

So $C_n = C_0\,\alpha^n$ and the cumulative collateral after $n$ loops is a partial geometric sum:

$$
TC_n = \sum_{i=0}^{n} C_0\,\alpha^i = C_0 \cdot \frac{1 - \alpha^{n+1}}{1 - \alpha}.
$$

Cumulative debt is $TC_n / \mathrm{cr}$ throughout, because every mint was at exactly the minimum ratio.

## The cap

The series converges when $\alpha < 1$, which is to say whenever $\mathrm{LTV} < \mathrm{cr}$. That holds in every sane pairing: the issuer requires more than a dollar of collateral per dollar of debt, and the lender advances less than a dollar per dollar of xUSD. In the limit,

$$
TC_\infty = \frac{C_0}{1-\alpha} = C_0 \cdot \frac{\mathrm{cr}}{\mathrm{cr} - \mathrm{LTV}}, \qquad L_\infty = \frac{\mathrm{cr}}{\mathrm{cr} - \mathrm{LTV}}.
$$

At $(1.20, 0.80)$ the cap is $3\times$. No user behavior changes it. The parameters set the ceiling; looping only decides how close to it you get.

| $n$ | $C_n$ | $\mathrm{xUSD}_n$ | $TC_n$ | Leverage $TC_n / C_0$ |
|---:|---:|---:|---:|---:|
| 0 | 1,000.00 | 833.33 | 1,000.00 | 1.00 |
| 1 | 666.67 | 555.56 | 1,666.67 | 1.67 |
| 2 | 444.44 | 370.37 | 2,111.11 | 2.11 |
| 3 | 296.30 | 246.91 | 2,407.41 | 2.41 |
| 4 | 197.53 | 164.61 | 2,604.94 | 2.60 |
| 5 | 131.69 | 109.74 | 2,736.63 | 2.74 |
| $\infty$ | 0 | 0 | 3,000.00 | 3.00 |

Five loops capture 91% of the cap. Each further loop adds two thirds of what the previous one added, and on a chain with per-transaction fees there is a point where the marginal mint is worth less than the fees to execute it.

The cap is more sensitive to the lender's parameter than to the issuer's. At $(1.20, 0.80)$,

$$
\frac{\partial L_\infty}{\partial\,\mathrm{LTV}} = \frac{\mathrm{cr}}{(\mathrm{cr}-\mathrm{LTV})^2} = 7.5, \qquad \frac{\partial L_\infty}{\partial\,\mathrm{cr}} = -\frac{\mathrm{LTV}}{(\mathrm{cr}-\mathrm{LTV})^2} = -5.
$$

A one-point loosening of LTV on Folks raised available leverage more than a one-point tightening of the collateral ratio at xBacked lowered it. The issuer's exposure to looping was partly in a parameter it did not control.

| $\mathrm{cr}$ | $\mathrm{LTV}$ | $\alpha$ | $L_\infty$ | Loops to reach 95% of cap |
|---:|---:|---:|---:|---:|
| 1.10 | 0.80 | 0.73 | 3.67 | 9 |
| 1.20 | 0.80 | 0.67 | 3.00 | 7 |
| 1.50 | 0.80 | 0.53 | 2.14 | 4 |
| 1.20 | 0.60 | 0.50 | 2.00 | 4 |

Higher caps converge more slowly. The regimes that offer the most leverage are also the ones that need the most transactions to reach it.

## Two balance sheets

After $n$ loops the user holds two positions that mirror each other.

**Stack A, the xBacked vault.** Collateral $TC_n$, volatile, against debt $TC_n/\mathrm{cr}$ in xUSD, stable.

**Stack B, the money market.** Supplied xUSD $S_n$, stable, against borrowed collateral $B_n$, volatile.

Under the closed-loop assumption that every iteration is funded entirely by the previous mint,

$$
S_n = TC_{n-1}/\mathrm{cr}, \qquad B_n = TC_n - C_0.
$$

Everything minted except the last round has been supplied; everything deposited except the first round has been borrowed.

## Net exposure is $C_0$, at every $n$

Vault leverage $L_\infty$ measures how much collateral the user controls inside Stack A. It is not the user's exposure to the collateral's price. That is

$$
TC_n - B_n = TC_n - (TC_n - C_0) = C_0.
$$

The user is long $TC_n$ of collateral in the vault and short $B_n$ of it at the lender, and the difference is the original deposit. The xUSD side nets to $-\mathrm{xUSD}_n$, which goes to zero as $n$ grows. In the limit the position has a dollar delta of exactly $C_0$ and no stablecoin delta at all.

So the closed loop is not a leveraged long. It is a carry structure: its return is the spread between what supplied xUSD earns on the money market and what borrowed collateral costs there, adjusted for the issuer's stability fee and any yield the vault collateral earns. A user who actually wants leveraged exposure to the collateral should swap the minted xUSD for collateral on a DEX and redeposit. That loop has $\alpha = 1/\mathrm{cr}$, a cap of $\mathrm{cr}/(\mathrm{cr}-1)$, which is $6\times$ at $\mathrm{cr} = 1.20$, and a net long delta of $C_0 L_\infty$. Same word, different trade.

## Liquidation in both directions

Zero net delta does not mean zero liquidation risk. Each stack holds the volatile asset on a different side, so each has its own trigger. Let $p_t$ be the collateral price relative to entry.

Stack A's ratio at time $t$ is $\mathrm{cr} \cdot p_t$. It liquidates when this falls to the liquidation ratio $\mathrm{cr}_{\mathrm{liq}}$, so on a drawdown of

$$
\delta^{\mathrm{down}} = 1 - \frac{\mathrm{cr}_{\mathrm{liq}}}{\mathrm{cr}}.
$$

Stack B's loan-to-value at time $t$ is $\mathrm{LTV} \cdot p_t$, because $B_n/S_n = \mathrm{cr}\cdot\alpha = \mathrm{LTV}$ for every $n$. It liquidates when this reaches the lender's maximum, so on a rally of

$$
\delta^{\mathrm{up}} = \frac{\mathrm{LTV}_{\max}}{\mathrm{LTV}} - 1.
$$

With $\mathrm{cr}_{\mathrm{liq}} = 1.10$ and $\mathrm{LTV}_{\max} = 0.85$, those are an 8.3% fall and a 6.25% rise. A position with no directional exposure gets liquidated by a move of a few percent in either direction, and each liquidation crystallizes a penalty out of $C_0$.

The two legs cannot cascade into each other. Any move that endangers Stack A relieves Stack B, and the reverse. The loop is internally hedged.

## Where the risk goes

The cascade is external. Suppose a downside shock liquidates a set of looped vaults. The liquidation engine sells the seized collateral, pushing the price down further. That does not hurt the surviving loopers, whose Stack B legs get safer as the price falls. It does hurt every ordinary single-vault user whose buffer was already compressed by the same move.

Looped users are net flat in dollars. Unlevered users are net long. The strategy exports its downside liquidation pressure from the first group onto the second. A single vault's buffer $\delta^{\mathrm{down}}$ is the same whether or not it is part of a loop, but as the looped share of the protocol rises, the aggregate collateral concentrates just above $\mathrm{cr}_{\mathrm{liq}}$, and the whole system becomes fragile to small shocks. That was the finding that mattered for protocol design.

## When the carry is positive

Let $r_{\mathrm{stab}}$ be the stability fee, $r_{\mathrm{sup}}$ the money-market supply rate on xUSD, $r_{\mathrm{bor}}$ the borrow rate on collateral, and $r_{\mathrm{stk}}$ any yield the vault collateral earns. Per dollar of equity, the limiting position returns

$$
\frac{R_\infty}{C_0} = \frac{\mathrm{cr}\, r_{\mathrm{stk}} - r_{\mathrm{stab}} + r_{\mathrm{sup}} - \mathrm{LTV}\, r_{\mathrm{bor}}}{\mathrm{cr} - \mathrm{LTV}}.
$$

Holding the collateral unlevered returns $r_{\mathrm{stk}}$. The loop beats the hold if and only if

$$
r_{\mathrm{sup}} - r_{\mathrm{stab}} > \mathrm{LTV}\,(r_{\mathrm{bor}} - r_{\mathrm{stk}}).
$$

Left side: what you earn issuing xUSD and lending it. Right side: what you pay borrowing collateral, weighted by how much you borrow, net of what that collateral yields. It is a relative-rate trade between two venues. The sign can flip whenever either market reprices, so the position needs monitoring, not just setup.

## Implementation notes

On Algorand the four steps of one loop can be submitted as a single atomic transaction group, so a loop either completes or does not happen. The loop is bounded either by an iteration count or by a minimum economic size: with per-loop fixed cost $\phi$ and captured spread $\eta$ per unit of xUSD, stop at the first $n$ where $C_0\,\alpha^{n}/\mathrm{cr}$ falls below $\phi/\eta$. Unwinding is the reverse sequence: withdraw collateral, repay the external borrow, withdraw supplied xUSD, repay vault debt, recurse.

## Why a page of algebra was worth writing

Nothing here required simulation. Two parameters give the cap, one subtraction gives the net exposure, two ratios give the liquidation bands, and one inequality gives the profitability condition. Protocol designers can size the fragility that looping introduces and users can size their positions, both without iterating.

The result I would put on a slide is the subtraction. Vault leverage and net leverage are different quantities, and the difference is the whole story of who bears the risk.
