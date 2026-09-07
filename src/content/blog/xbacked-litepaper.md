---
title: "xUSD by Design: The xBacked Litepaper, Annotated"
subtitle: How an over-collateralized stablecoin held its peg on Algorand. Vaults, partial liquidation, a redemption floor, and the keepers who ran it, with the reasoning the litepaper left implicit.
excerpt: The xBacked Litepaper v2.0 described xUSD in examples. This is the same design explained mechanism by mechanism, including the liquidation formula derived from first principles and the arithmetic behind the peg band.
date: 2026-09-07
readMinutes: 12
tags:
  - DeFi
  - Stablecoins
  - Protocol Design
  - Algorand
---

xBacked issued xUSD, an over-collateralized stablecoin on Algorand. Every xUSD in circulation sat against collateral in a vault, a collateralized debt position in the MakerDAO tradition. In March 2022 the team published version 2.0 of the litepaper, which I co-authored. It described the system almost entirely through worked examples.

This post is the same design explained as a set of mechanisms. Where the litepaper gave a number, I try to give the reason for the number.

## One principle: debt is denominated in xUSD

The protocol never thinks in dollars. A vault's debt is a quantity of xUSD; fees accrue as xUSD; repayment is in xUSD. Alice deposits \$100 of ALGO, mints 50 xUSD, and closes her vault by returning 50 xUSD plus whatever supply fee accrued. If she has sold the 50 xUSD, she buys 50 back on the open market to close.

This has a consequence worth stating. There is system debt, the total xUSD supply, and there is vault debt. Nobody who mints xUSD is expected to repay the protocol. The only expectation is that every vault eventually closes, by repayment, by liquidation, or by redemption. The peg mechanisms below are all ways of making one of those three happen when the price says it should.

## Vaults and the two ratios

A vault's collateralization ratio is the value of its collateral over its debt. The contract enforces one number: below 110% a vault can be liquidated. The team's frontend enforced a second: a vault must be created at 120% or above, and collateral cannot be withdrawn if doing so would leave the ratio under 120%.

The gap between the two is the user's buffer. Alice deposits \$100 of ALGO and mints 80 xUSD, for a ratio of 125%. If her ALGO falls to \$87.55 the ratio is 109% and she is liquidatable. The 10-point band between the withdrawal floor and the liquidation line is what gives her time to add collateral or repay.

The split between contract and frontend was deliberate. The contract's invariant was the minimum needed for solvency. The stricter rule was a default, enforceable by any interface but not by the chain, which kept the contract simple and left room for other frontends to set their own policy.

## Fees, and where they go

| Fee | Rate | Charged on |
|---|---:|---|
| Liquidation | 1% | collateral liquidated |
| Redemption | 2% | collateral redeemed |
| Supply | varies by collateral type | xUSD outstanding, accrues continuously |

Supply fees split between the DAO treasury and staked governance token holders. Liquidation and redemption fees split between the treasury and the xUSD staking pool that funds liquidations. The litepaper's fee table lists a 50/50 split and its worked examples route 60% to xUSD stakers; the split was a governance parameter. The principle behind the split is that every fee funds one of two things: the people who maintain the protocol, or the people who keep it solvent.

## Liquidation: partial, and sized by a formula

A vault under 110% is not closed. It is liquidated only far enough to bring it back to 120%. Partial liquidation is kinder to the vault owner, who keeps most of their position, and it limits how much collateral hits the market in one shock.

Two kinds of keeper can liquidate. One uses their own xUSD to repay the vault's debt and receives the liquidated collateral at a discount. The other draws on a pool of xUSD staked by third parties, puts up no capital, and takes a small cut, with the rest of the collateral going to the pool's stakers. The second design matters more than it looks: it separates the capital that funds liquidations from the bots that execute them, so a liquidation never waits on a keeper's own balance.

The litepaper gives the maximum liquidation as a block of JavaScript. Here is where it comes from. Let $V$ be the vault's collateral value, $D$ its debt, $\rho$ the target ratio after liquidation, and $d$ the inverse of the liquidator's discount, so a repayment of $\ell$ xUSD entitles the liquidator to $\ell/d$ of collateral. After repaying $\ell$, the vault must sit exactly at the target:

$$
\frac{V - \ell/d}{D - \ell} = \rho
\quad\Longrightarrow\quad
\ell = \frac{d\,V - \rho\, d\, D}{1 - \rho\, d}.
$$

With the launch parameters $\rho = 1.20$, $d = 1 - 0.035 = 0.965$, a vault holding \$1,000 of ALGO against 910 xUSD of debt, at 109.9% and therefore liquidatable, gives

$$
\ell = \frac{965 - 1{,}053.78}{1 - 1.158} \approx 562 \text{ xUSD}.
$$

The keeper repays 562 xUSD and takes about \$582 of collateral. The protocol keeps 1% of that as its fee; the discount was 3.5%, so the keeper nets 2.5%. The vault is left with roughly \$418 of ALGO against 348 xUSD, which is 120%. Any repayment larger than $\ell$ would overshoot the target and take more from the owner than solvency requires.

Two keepers can also liquidate the same vault in sequence. The first repays 100 xUSD and takes its collateral, moving the vault only part of the way. The second recomputes $\ell$ from the new state and repays the remainder. Because the formula only depends on the current $V$ and $D$, keepers compose without coordination.

## Redemption: the floor under the peg

Withdrawal is the owner taking collateral out of their own vault. Redemption is anyone turning 1 xUSD into \$1 of collateral drawn from the riskiest vaults in the system, minus a 2% fee. That guarantee is what makes the peg hard rather than aspirational.

The arithmetic of the floor is simple. Redeeming 1 xUSD returns \$0.98 of collateral. If xUSD trades at \$0.97, buying it and redeeming it earns a cent per token, and the buying pushes the price back up. Below \$0.98 the arbitrage is open; above it, redemption loses money and nobody does it. Redemption is dormant in calm markets and switches on exactly when it is needed.

Because redemption draws on the riskiest vaults first, it does something else: it penalizes thin collateralization. A vault at 111% is the first to lose collateral when someone redeems. Owners who want to be left alone keep their ratio high. The contract tracked the two riskiest vaults, and a class of keepers earned a bounty for proposing a vault riskier than either of them.

What if someone tries to redeem more than the system can pay? xUSD can only be minted against collateral at 110% or more, so a million xUSD in circulation is backed by at least \$1.1 million. To drain the system, a redeemer would have to own the majority of all xUSD, and buying that much would move the price back toward par long before they finished. A cartel of the largest vaults could redeem, say, 750,000 xUSD at \$0.90 for a \$75,000 profit, but the remaining 250,000 xUSD would still sit against \$350,000 of collateral. The peg survives the attack by construction.

## The peg band

Put the mechanisms together and xUSD has a floor and a soft ceiling.

**Below par.** Two forces push up. Vault owners can buy cheap xUSD and repay debt at a discount, contracting supply. Below \$0.98, redeemers buy xUSD and convert it to collateral, contracting supply faster.

**Above par.** Anyone can open a vault, mint xUSD at par, and sell it above par. Supply expands until the premium closes. The litepaper also describes partial liquidation of risky vaults in this regime, which returns collateral to the market and lets the system's overall ratio recover.

Neither side needs a central actor. The band is roughly \$0.98 to a little over \$1.00, and every move outside it is a profit opportunity for someone whose profit restores the band.

## Isolated risk markets

Each collateral type lives in its own vault contract. A user's ALGO vault and their vault in a more volatile asset are separate positions: one can be liquidated without touching the other.

For the protocol the isolation is a risk dial. Each collateral type gets its own minimum ratio, its own supply fee, and its own minting capacity. Blue-chip collateral gets the best terms and the most room. Speculative collateral can be admitted at a high ratio and a low cap, so the experiment is contained if it goes wrong. It also let the team list new collateral quickly, because listing was a parameter change on a fresh contract rather than a modification to the shared one.

## Keepers as the protocol's workforce

Every maintenance action in xBacked was permissionless and paid.

- **Liquidators** repay unhealthy vaults, using their own xUSD or the staked pool.
- **Vault proposers** keep the redemption target current by proposing riskier vaults, for a bounty.
- **Fee collectors** trigger distribution of a vault contract's accrued fees, keeping 0.5%.
- **Supply fee settlers** distribute accrued supply fees to the DAO and governance stakers. This one paid nothing directly, but a governance staker had reason to call it.

Anyone could stake xUSD into the liquidation pool, whether or not they held a vault, and earn a share of liquidation and redemption fees. Stakers accrued points by size and duration and could exchange points for a proportional share of the fees in the contract at any time. The pool made liquidations independent of any single keeper's capital, and the points system made the pool's yield legible.

The design principle, which the litepaper never states outright, is that a protocol with no employees needs every job it depends on to be a job someone is paid to do.

## What I would write differently now

The litepaper was a description, not an argument. It did not explain why the ratios were 110 and 120, or what the redemption mechanism does to vault owners' incentives, or what happens when users compose xUSD with a lending market. The two architecture decision records I wrote in the months after it, [ADR-46 on vault looping](/blog/adr46) and [ADR-47 on LP-backed issuance](/blog/adr47), were both attempts to supply the reasoning that the launch document skipped. A protocol's public document should carry its own proofs. This one relied on its readers to trust that the numbers had been thought about. They had been, but the document should have shown it.
