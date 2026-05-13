---
title: Releases
description: Sysko release history and changelog.
---

## Unreleased

Changes on `main` not yet published to npm.

### Features

- **HTTPS support** — pass `dashboard.tls: { cert, key }` to `init()` to serve the dashboard over HTTPS.
- **External storage adapter** — `storage` option now accepts any object implementing `SpanStore`, enabling custom backends (Postgres, MySQL, etc.) without forking the library.
- **Self-observation** — set `selfObservation: true` to instrument the dashboard server itself; its HTTP traffic appears as regular spans.
- **Adaptive sampling** — `adaptiveSampling: { targetSpansPerSecond }` automatically adjusts the sampling rate to stay near a target throughput.
- **NestJS example** — new `examples/nestjs-app` with full plugin and traceparent coverage.
- **Next.js example** — new `examples/nextjs-app` using the `instrumentation.ts` hook.
- **Benchmark** — new `examples/benchmark` measuring Sysko overhead against a bare Express baseline (p99 target < 5 ms).

---

## v0.2.0

**Released:** May 12, 2026

### Features

- **CommonJS support** — all packages now ship a dual ESM + CJS build, enabling use with `ts-node`, Jest, and any CommonJS project without `"type": "module"`.

### Fixes

- CJS interop for projects that `require()` Sysko packages directly.

---

## v0.1.0

**Released:** May 12, 2026 · [npm](https://www.npmjs.com/package/@syskoio/core/v/0.1.0)

Initial public release.

### Features

- **Zero-config tracing** — call `init()` and every inbound HTTP request becomes a span automatically via `AsyncLocalStorage` and `http.Server.prototype.emit` patching.
- **Outbound tracing** — `fetch`, `http.request`, and `https.request` produce child `http.client` spans with W3C `traceparent` injection.
- **Console log correlation** — `console.log/warn/error/info` calls are attached as logs to the active span.
- **SQLite storage** — spans are persisted to `~/.sysko/<name>.db` with configurable retention (`days`, `maxRows`).
- **In-memory storage** — opt-in `RingBuffer` for ephemeral workloads.
- **Realtime dashboard** — served at `localhost:9999` with tabs for Spans, Endpoints, Distribution, Errors, Alerts, and System metrics.
- **Trace waterfall** — hierarchical span view with inline logs, relative timing, and side-by-side trace comparison.
- **Alerts** — define `errorRate`, `p99Latency`, or `spanRate` rules; receive webhook notifications with cooldown support.
- **System metrics** — CPU, memory, and event loop lag collected every 5 s.
- **Password protection** — set `dashboard.password` to enable a login screen with brute-force rate limiting.
- **W3C traceparent** — distributed traces are linked across services automatically; no manual header propagation needed.
- **Plugins** — opt-in integrations for Express, Fastify, Prisma, Redis, Axios, BullMQ, Mongoose, Sequelize, TypeORM, and pg.
- **Collector** — standalone Docker agent that receives spans via `/v1/spans` and serves an aggregated dashboard.
- **CLI** — `sysko init` scaffolds the initial configuration interactively.
- **Sampling & rate limiting** — `sampling` (0–1) and `rateLimit` (spans/s) to control volume.
- **PII redaction** — `redact.paths` and `redact.queryParams` strip sensitive data before storage.
- **Remote export** — `export.url` forwards spans to a remote Sysko collector in addition to local storage.
