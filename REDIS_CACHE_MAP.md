# Redis Cache Map and Recommendations

This document maps current Redis cache usage in the backend and recommends the next endpoints to cache for maximum impact.

## Route mount context

All endpoints below are final paths under `/api` because route mounts are configured in `backend/app.js`.

- Admin routes mounted at `/api`
- Payment routes mounted at `/api/payment`

## Current endpoint cache status

| Endpoint | Cached in Redis | Current behavior | Notes |
|---|---:|---|---|
| `/api/admin/revenue/platform-intelligence` | Yes | Read-through cache using query-based key; returns cache hit payload; writes with TTL 180s | Core active Redis cache endpoint |
| `/api/admin/cache/redis-stats` | No | Returns Redis cache stats counters | Observability endpoint, not business cache |
| `/api/admin/cache/redis-stats/reset` | No | Resets Redis cache stats counters | Observability endpoint |
| `/api/admindashboard` | No | Heavy dashboard aggregation from multiple collections | High potential for short-TTL caching |
| `/api/admin/analytics` | Yes | Read-through cache with timeFilter-based key; TTL 120s | Newly implemented |
| `/api/admin/revenue` | No | Revenue analytics endpoint, currently uncached | Candidate for caching after dashboard/analytics |
| `/api/companyongoing_projects` | No | Company ongoing projects query path | Candidate for per-company cache |
| `/api/ongoing_projects` | No | Customer ongoing projects query path | Candidate for per-customer cache |

## Existing invalidation coverage

The following mutation flows invalidate both admin cache prefixes:

- `admin:platform-revenue-intelligence:v1`
- `admin:analytics:v1`

Mutation flows:

- `POST /api/company/platform-fee-invoice`
- `POST /api/payment/company/verify-payment`
- `POST /api/payment/company/release-milestone`
- `POST /api/payment/company/platform-fee/verify-payment`
- `POST /api/platform-manager/company-payments/:projectId/:milestonePercentage/collect`

## Best next 3 endpoints to cache (ranked)

| Priority | Endpoint | Why this is high impact | Suggested TTL |
|---|---|---|---|
| 1 | `/api/admindashboard` | Multi-collection dashboard loaded frequently by admins | 60-120s |
| 2 | `/api/ongoing_projects` | High user traffic path; repeated reads per customer session | 30-60s |
| 3 | `/api/companyongoing_projects` | Frequent company dashboard polling/navigation pattern | 30-60s |

## Implementation notes for next phase

1. Build cache keys with user and filter scope to avoid cross-user data leakage.
2. Use short TTLs first, then tune from real hit-rate metrics.
3. Add invalidation hooks on writes that impact each cached endpoint.
4. Keep graceful fallback: if Redis is unavailable, continue serving from DB.
