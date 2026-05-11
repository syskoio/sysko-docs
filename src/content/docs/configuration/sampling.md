---
title: Sampling & rate limiting
description: Controlling how many spans Sysko records.
---

Two mechanisms control how much data Sysko captures: **sampling** (probabilistic, per-trace) and **rate limiting** (throughput cap, per-span).

## Sampling

```ts
await init({ serviceName: "my-app", sampling: 0.1 });
```

`sampling` is a number between `0` and `1`. It represents the fraction of root spans (inbound requests) that are recorded.

- `1` — record everything (default)
- `0.1` — record 10% of traces
- `0` — record nothing

The sampling decision is made at the root span and propagated to all child spans via `AsyncLocalStorage`. A trace is either fully recorded or fully discarded — you will never see partial traces.

Unsampled spans use a zero-allocation no-op handle, so there is no overhead beyond the initial coin-flip at the root.

## Rate limiting

```ts
await init({ serviceName: "my-app", rateLimit: 200 });
```

`rateLimit` caps the number of spans recorded per second, enforced via a token bucket. Spans that exceed the limit are silently dropped. Default is `500`.

This acts as a hard ceiling independent of sampling — useful when you want 100% sampling but need to protect against traffic spikes.

## Combining both

Sampling and rate limiting are complementary. A common production setup:

```ts
await init({
  serviceName: "my-app",
  sampling: 0.25,   // record 25% of traces
  rateLimit: 200,   // but never more than 200 spans/s regardless
});
```
