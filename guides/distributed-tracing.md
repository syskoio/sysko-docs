---
title: Distributed tracing
description: Tracing requests across multiple services with Sysko.
---

Sysko supports distributed tracing via the W3C `traceparent` header. When two services both run Sysko, a trace that starts in service A continues in service B — you see the full journey in one waterfall.

## How it works

**Outbound propagation**: when your app makes an outbound HTTP request (via `http.request`, `https.request`, `fetch`, or the Axios plugin), Sysko automatically injects a `traceparent` header into the request.

**Inbound extraction**: when your app receives an inbound request that contains a `traceparent` header, Sysko extracts the `traceId` and `parentSpanId` and uses them for the new span — continuing the trace from the upstream service.

No configuration is required. Both services just need to be running Sysko.

## Viewing cross-service traces

In the dashboard, spans from different services in the same trace appear together in the waterfall view. Each span shows a `service.name` badge, so you can see which service handled which part of the request.

Use the **service filter** in the filter bar to narrow to a specific service, or leave it unset to see spans across all services.

## Using the Collector

When you have multiple services, you can run `@sysko/collector` as a central aggregation point. Each service sends its spans to the Collector, which stores and serves them from a single dashboard.

See [Using the Collector](/guides/collector) for setup instructions.

## Propagating context to non-Sysko services

If you are calling a service that does not use Sysko but supports W3C `traceparent` (e.g., a service using OpenTelemetry), the header is still injected and will be honored by the downstream service.

Likewise, if your service receives a `traceparent` from an upstream OpenTelemetry-instrumented service, Sysko extracts it and continues the trace.
