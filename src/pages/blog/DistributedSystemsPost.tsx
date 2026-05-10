import BlogPostLayout from './BlogPostLayout';

export default function DistributedSystemsPost() {
  return (
    <BlogPostLayout
      title="Distributed Systems Patterns"
      subtitle="Lessons learned building resilient infrastructure at Oracle Cloud Infrastructure and CAM Grupo."
      date="JULY 2024"
      readTime="15 MIN READ"
      tags={['Systems Design', 'Cloud', 'CI/CD', 'Oracle']}
    >
      <p>
        Between 2019 and 2021, I built OCI image pipelines at Oracle Cloud Infrastructure, migrating on-premise Big Data applications to the cloud. Then, starting in 2020, I architected the entire technology stack for CAM Grupo, a 20+ agent luxury real estate brokerage. These two environments — a Fortune 500 cloud provider and a lean startup — taught me that distributed systems patterns are universal, but their implementation depends entirely on constraints.
      </p>

      <h2>Pattern 1: The Image Pipeline as a State Machine</h2>
      <p>
        At Oracle, every server re-imaging operation had to be atomic and recoverable. A failed firmware update on a production Big Data node could cost millions. We modeled the entire pipeline as a state machine:
      </p>
      <pre>
{`States: PENDING → DOWNLOADING → VERIFYING → FLASHING → VALIDATING → ACTIVE
        ↓           ↓            ↓           ↓          ↓            ↓
     TIMEOUT     RETRY        CORRUPT    ROLLBACK   FAILED       COMMIT

Transitions are triggered by events:
  - checksum_verified  → VERIFYING → FLASHING
  - flash_timeout      → FLASHING → ROLLBACK
  - health_check_pass  → VALIDATING → ACTIVE`}
      </pre>
      <p>
        The critical insight: every state must have a defined recovery path. If FLASHING fails, ROLLBACK is not optional — it is the only valid transition. At CAM Grupo, I applied the same pattern to our HDR photography pipeline: perspective correction → sharpening → CLAHE → LUT application. Each stage is a state with a rollback to the previous valid output.
      </p>

      <h2>Pattern 2: CI/CD as a Directed Acyclic Graph</h2>
      <p>
        Our TeamCity pipelines at Oracle started as linear scripts. They quickly became unmaintainable. The solution was to model CI/CD as a DAG where nodes are build stages and edges are artifact dependencies:
      </p>
      <pre>
{`compile → unit_test → integration_test → artifact_build
   ↓           ↓              ↓                  ↓
   └──→ static_analysis ←────┘                  ↓
                                                ↓
   security_scan → deploy_staging → e2e_test → deploy_prod
        ↓
   gate_approval (manual)`}
      </pre>
      <p>
        The DAG structure enforces two properties: (1) no circular dependencies, and (2) parallel execution where possible. At CAM Grupo, our property portal deployment follows the same DAG pattern but with different stage definitions: build → lint → test → dockerize → deploy to staging → visual regression → deploy to production.
      </p>

      <h2>Pattern 3: Idempotency at Every Boundary</h2>
      <p>
        The most expensive bugs in distributed systems are not crashes — they are duplicate operations. A retried HTTP request that creates two orders. A reprocessed SQS message that charges a customer twice. At Oracle, we enforced idempotency through UUID-based deduplication:
      </p>
      <pre>
{`class IdempotentOperation:
    def execute(self, request_id, operation):
        if self.store.exists(request_id):
            return self.store.get_result(request_id)
        
        result = operation()
        self.store.set(request_id, result, ttl=86400)
        return result`}
      </pre>
      <p>
        At CAM Grupo, this pattern appears in our contract generation system. Each NOM-247 document has a unique hash based on property ID + client ID + timestamp. Regenerating the same contract returns the cached PDF instead of creating a duplicate.
      </p>

      <h2>Pattern 4: Health Checks as Contracts</h2>
      <p>
        Oracle's Severity 1 support rotation taught me that health checks should not just return HTTP 200. They should verify every dependency the service needs to function:
      </p>
      <pre>
{`GET /health

Expected response:
{
  "status": "healthy",
  "checks": {
    "database": { "status": "ok", "latency_ms": 12 },
    "cache": { "status": "ok", "hit_ratio": 0.94 },
    "external_api": { "status": "ok", "last_success": "2024-07-15T10:23:00Z" },
    "disk": { "status": "ok", "free_percent": 34 }
  }
}

A service is healthy only if ALL checks pass.`}
      </pre>
      <p>
        This granularity saved us during a critical incident when the main application was responding but the cache was in a split-brain state. A simple HTTP 200 would have masked the problem. Detailed checks exposed it within seconds.
      </p>

      <h2>Pattern 5: Circuit Breakers for External Dependencies</h2>
      <p>
        CAM Grupo's MLS data integration relies on third-party APIs with unpredictable latency. A circuit breaker prevents cascading failures:
      </p>
      <pre>
{`State Machine:
  CLOSED  → error_rate > 0.5 → OPEN
  OPEN    → wait 30s          → HALF_OPEN
  HALF_OPEN → success        → CLOSED
  HALF_OPEN → failure        → OPEN

In OPEN state:
  - All requests fail fast with cached data
  - No network calls to the degraded service
  - Background probes test recovery`}
      </pre>
      <p>
        Without this pattern, a slow MLS API would eventually exhaust our connection pool and crash the entire property search service. With the circuit breaker, users see slightly stale data instead of an error page.
      </p>

      <h2>Pattern 6: Event Sourcing for Auditability</h2>
      <p>
        Real estate transactions require immutable audit trails. At CAM Grupo, we use an event-sourced model where every state change is an append-only event:
      </p>
      <pre>
{`Events:
  PropertyListed { property_id, price, agent_id, timestamp }
  PriceUpdated   { property_id, old_price, new_price, reason }
  ContractSigned { property_id, client_id, document_hash }
  
Current state = fold(apply_event, events)`}
      </pre>
      <p>
        This is overkill for simple CRUD applications. But when a transaction involves seven-figure sums and legal compliance, being able to replay every decision point is not a luxury — it is a requirement.
      </p>

      <h2>The Meta-Pattern: Constraints Determine Architecture</h2>
      <p>
        Oracle had infinite compute but infinite process. CAM Grupo has limited resources but unlimited autonomy. The same patterns apply, but their implementations diverge:
      </p>
      <ul>
        <li>Oracle used Kubernetes and Artifactory. CAM Grupo uses Docker Compose and GitHub Actions.</li>
        <li>Oracle had 24/7 SRE teams. CAM Grupo has me, on-call by default.</li>
        <li>Oracle's state machine had 12 states. CAM Grupo's has 4.</li>
      </ul>
      <p>
        The lesson: start with the pattern, not the tool. Understand what property you need (atomicity, idempotency, observability) and then choose the simplest implementation that satisfies your constraints. Complexity is a constraint failure.
      </p>
    </BlogPostLayout>
  );
}
