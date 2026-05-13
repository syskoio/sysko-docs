---
title: How tracing works
description: How Sysko instruments your Node.js app without any manual code changes.
---

Sysko instruments your application automatically using two Node.js primitives: `AsyncLocalStorage` and `perf_hooks`.

## AsyncLocalStorage

`AsyncLocalStorage` is a Node.js API (stable since v16) that stores data scoped to an asynchronous execution context. Think of it as a "thread-local" variable for async code.

When an inbound request arrives, Sysko creates a new context in `AsyncLocalStorage` containing the active span. This context is automatically inherited by:

- Every `await` within that request handler
- Every Promise chain
- Every callback passed to `setTimeout`, `setImmediate`, or `process.nextTick`
- Every event emitter listener registered within that context

This means any code that runs as part of handling a request — regardless of how deeply nested or how many async hops it takes — can see the active span without you passing it around explicitly.

## How spans are created

When Sysko detects a new inbound HTTP request (via a monkeypatch on `http.Server.prototype.emit`), it:

1. Records the start time using `performance.now()` (from `perf_hooks`) for high-resolution timing
2. Generates a `traceId` and `spanId`
3. Creates a new `AsyncLocalStorage` context containing the span
4. Runs your request handler inside that context

When the request finishes, Sysko closes the span, records the duration, and sends it to storage and the dashboard.

## Child spans

Any code that calls `startSpan()`, `withSpan()`, or uses an instrumented client (Prisma, fetch, etc.) within an active context automatically becomes a **child span**:

- It inherits the `traceId` from the active span
- Its `parentSpanId` is set to the current span's `spanId`
- It is timed independently with its own `perf_hooks` timestamp

This produces a hierarchy: one root span (the inbound request) with N child spans (DB calls, outbound HTTP, custom spans).

## Why not OpenTelemetry's approach

OpenTelemetry works similarly under the hood but requires you to install separate instrumentation packages for every library, configure an exporter, configure a collector, and configure a backend. Sysko instruments everything by default and ships its own dashboard.
