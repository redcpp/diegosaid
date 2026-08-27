---
title: ADR-47 Explained for Engineers
subtitle: How a proof by contradiction saved a DeFi protocol from a flawed LP-seeding mechanism.
excerpt: How a proof by contradiction saved a DeFi protocol from a flawed LP-seeding mechanism — and why the math held up against the 2022 algorithmic stablecoin failures.
date: 2024-05-01
readMinutes: 12
tags:
  - DeFi
  - Formal Proof
  - Risk Analysis
  - Algorand
---

In August 2021, I joined xBacked DAO as a core developer on a DeFi lending protocol built on Algorand. The protocol featured xUSD, an over-collateralized stablecoin. Six months later, I authored ADR-47 — a formal proof by contradiction that prevented a flawed LP-seeding mechanism from launching. This article walks through the engineering reasoning behind that analysis.

## The Proposed Mechanism

The protocol team proposed a PACT/xUSD liquidity pool seeding mechanism designed to bootstrap initial liquidity. The idea was elegant: the protocol would deposit a large amount of xUSD and PACT tokens into a constant-product AMM pool, creating deep liquidity from day one.

On paper, this solved the cold-start problem. In practice, it introduced a systemic arbitrage vulnerability that violated the no-arbitrage condition — the fundamental assumption that keeps AMM pricing aligned with external markets.

## The No-Arbitrage Condition

In any efficient market, the no-arbitrage condition states that there should exist no risk-free profit opportunity from price discrepancies between venues. For AMM liquidity pools, this means:

$$
P_{\text{pool}} = P_{\text{market}}
$$

If $P_{\text{pool}} \neq P_{\text{market}}$, arbitrageurs trade until equality is restored, and LPs suffer impermanent loss proportional to the deviation.

The LP-seeding mechanism violated this by creating a massive, one-sided liquidity injection at a price point not validated by external markets. The protocol would effectively be setting the initial price arbitrarily — a price that sophisticated actors could exploit before retail users even accessed the pool.

## Proof by Contradiction

Here is the core argument from ADR-47, reconstructed for clarity:

**Assume:** The LP-seeding mechanism maintains the peg.

1. The protocol deposits $(X, Y)$ into the pool at ratio $R = X / Y$.
2. $R$ is set by the protocol team, not by market discovery.
3. If $R > P_{\text{market}}$, arbitrageurs sell xUSD to the pool.
4. If $R < P_{\text{market}}$, arbitrageurs buy xUSD from the pool.
5. In both cases, the protocol's deposited liquidity is drained.
6. Therefore, the peg cannot be maintained.

**Contradiction.** $\blacksquare$

The key insight is Step 2: any protocol-set price is informationally inferior to a market-discovered price. By injecting liquidity at an arbitrary ratio, the protocol becomes the counterparty to every arbitrage trade — and arbitrageurs have better information.

## The Historical Parallel

Six months after ADR-47, the 2022 algorithmic stablecoin collapses validated this analysis empirically. Terra's UST, Iron Finance, and others suffered from mechanisms that assumed stability could be engineered through liquidity incentives rather than economic fundamentals.

The pattern is consistent: when a protocol tries to set prices rather than discover them, informed actors extract value until the mechanism breaks. ADR-47 identified this pattern before it became a headline.

## Engineering Lessons

For protocol engineers, ADR-47 illustrates three principles:

1. **Price discovery precedes liquidity.** You cannot bootstrap liquidity without a credible price signal. AMMs are price discovery mechanisms, not price setting mechanisms.
2. **The protocol should never be the dumb money.** If your mechanism requires the protocol to take the wrong side of a trade, it will be exploited.
3. **Formal reasoning scales better than intuition.** The team initially disagreed on the severity. A proof by contradiction removed subjectivity from the discussion.

## Implementation Details

The xBacked protocol was implemented in PyTeal, Algorand's Python smart contract language. The LP-seeding mechanism would have been a stateful smart contract managing the initial liquidity deposit. Here is a simplified representation of the vulnerable logic:

```python
# Simplified vulnerable logic (NOT deployed)
def seed_liquidity(xusd_amount, pact_amount):
    # Protocol sets the ratio arbitrarily
    ratio = xusd_amount / pact_amount

    # Deposit into constant-product pool
    pool.deposit(xusd_amount, pact_amount)

    # Mint LP tokens to protocol treasury
    lp_tokens = sqrt(xusd_amount * pact_amount)
    treasury.mint(lp_tokens)
```

The corrected approach, proposed in ADR-47, was to use a gradual liquidity build-up through incentivized user deposits over a 14-day period, allowing market forces to discover the price organically before protocol capital was committed.

## Conclusion

ADR-47 was not about finding a bug in the code. It was about finding a bug in the economic model. In DeFi, the most dangerous vulnerabilities are not reentrancy or overflow errors — they are mechanisms that violate assumptions markets depend on. The no-arbitrage condition is not a suggestion. It is a law, and protocols that break it pay the price.
