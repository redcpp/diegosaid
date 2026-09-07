---
title: Distributed Systems Patterns
subtitle: Four habits that survived the move from a Fortune 500 cloud provider to a firm where the on-call rotation is one person.
excerpt: What carried over from building image pipelines and holding a Severity-1 pager at Oracle Cloud to running everything at a small real estate firm. State machines, idempotency, dependency-aware health, and picking the smallest tool.
date: 2026-09-07
readMinutes: 6
tags:
  - Systems Design
  - Cloud
  - CI/CD
  - Oracle
---

Between 2019 and 2021 I worked on Oracle Cloud Infrastructure's Big Data Service, building the image pipelines that moved on-premise Big Data applications into the cloud and taking my turn on the global on-call rotation for Severity-1 incidents. Since 2024 I have run engineering for Century 21 CAM Grupo, a real estate brokerage in Riviera Nayarit, where the infrastructure is a handful of Astro sites on Cloudflare, a PostgreSQL database of MLS transactions, a document-generation service, and a private LLM server.

The two environments have almost nothing in common in scale. Four habits transferred anyway. I have come to think they are the part of distributed systems that is actually about systems, as opposed to the part that is about Kubernetes.

## A pipeline is a state machine, and every state needs an exit

An image pipeline takes a base image, applies a stack of software, verifies the result, and publishes an artifact. Written as a script, it is a sequence of steps. Written as a state machine, it is a set of states with explicit transitions, including the transitions you do not want.

The difference shows up on failure. A script that dies during publish leaves an artifact that is half-uploaded, or uploaded but unverified, and the next run has to guess what happened. A state machine forces the question at design time: if verification fails, what state are we in, and what is the only legal move from there? At Oracle the answer was usually "discard and rebuild from the last verified stage," and encoding that in TeamCity as separate stages with artifacts between them meant a failed run could resume rather than restart.

At CAM Grupo the pipeline is a document generator: property data goes in, a regulated contract comes out. The states are fewer, but the rule is identical. A contract is either fully generated and validated or it does not exist. There is no state where a partially rendered document has been handed to a client.

## Every boundary is a retry boundary, so every operation must be idempotent

Networks retry. Queues redeliver. Users double-click. If an operation is not safe to run twice, it will eventually run twice, and the second run will be the expensive one.

At Oracle this was a rule for the Python REST services that drove the pipelines: every mutating request carried a client-supplied key, and replaying a key returned the original result instead of doing the work again. The pattern is old and boring and it removed a whole class of incidents.

The same rule shaped the contract generator. Generation is a pure function of its inputs. Regenerating a contract for the same property, client, and terms produces the same document, byte for byte, so a retry after a timeout cannot create a second, subtly different contract in a legal workflow. Determinism is idempotency you get for free.

## Healthy means the dependencies are healthy

A Severity-1 rotation teaches one thing quickly: a service that answers 200 on its health endpoint while its database is unreachable has lied to you at the worst possible moment. Root-cause analysis on enterprise outages, over and over, traced back to a component that was up but not functional, and to monitoring that could not tell the difference.

The habit that stuck is to make a health check a contract about dependencies. Each thing the service needs in order to do its job gets its own line: the database, the cache, the external API, the disk. Health is the conjunction. When something degrades, the check says which dependency, and the pager tells you where to look instead of that something is wrong.

At the brokerage the same idea applies to data rather than services. The market-intelligence pipeline that cleans MLS transactions runs anomaly detection on its own output before anything downstream reads it. A dashboard that silently renders bad data is the data-pipeline version of a health check that returns 200.

## Constraints pick the tool, not the other way around

Oracle had effectively unlimited compute and a process to match. CAM Grupo has a very limited budget and complete autonomy. The patterns above apply in both places. The implementations do not.

- Oracle published images through Artifactory with TeamCity orchestrating. The brokerage's sites build on Cloudflare from a git push.
- Oracle had SRE teams on follow-the-sun rotation. The brokerage has me, and the systems are chosen so that a page at 3 a.m. is rare and simple.
- Oracle needed a stateful service for nearly everything. The brokerage runs static sites wherever a static site will do, which is most places.

The mistake I see most often, in both large and small teams, is picking the tool first and then discovering which properties it gives you. It works better in the other order. Decide what you need: atomic publishes, safe retries, honest health signals. Then pick the simplest thing that provides it. Complexity that does not buy one of those properties is a constraint you added yourself.
