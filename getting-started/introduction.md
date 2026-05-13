---
title: Introduction
description: What Sysko is, who it is for, and what it is not.
---

# Introduction

Sysko Observe is a Node.js observability library that gives you automatic request tracing, a real-time dashboard, and production-grade features — all from a single `init()` call.

Think of it as **Chrome DevTools for your backend**.

## Who it is for

Sysko is built for teams and developers who want observability without the overhead of a full OpenTelemetry + Grafana + Datadog stack:

- Startups and SaaS products
- Microservices and side projects
- Solo developers
- Anyone who wants to see what is happening inside their Node.js app in under 2 minutes

## What you get out of the box

Once you call `sysko.init()`, the following are instrumented automatically — no additional code required:

- **HTTP server**: every inbound request becomes a trace
- **HTTP client**: outbound `http.request`, `https.request`, `fetch` — each becomes a child span
- **Console logs**: `console.log/warn/error/info` are captured and correlated to the active span
- **Uncaught errors**: `uncaughtException` and `unhandledRejection` mark the active span as failed
- **W3C `traceparent`**: injected into outbound requests and extracted from inbound ones, so traces continue across services

Additional instrumentation (Express, Fastify, Prisma, Redis, etc.) is available as opt-in [plugins](/plugins/express).

## What it is not

Sysko is not a replacement for every use case:

- It is not a product analytics tool (PostHog, Amplitude)
- It is not an error tracking platform (Sentry)
- It is not designed for large enterprise SRE platforms with RBAC, SSO, or audit logs
- It does not support Node.js versions below 20

## How it compares to OpenTelemetry

|                          | Sysko               | OpenTelemetry                       |
|--------------------------|---------------------|-------------------------------------|
| Setup time               | < 2 minutes         | Hours to days                       |
| Config required          | None                | Exporters, collectors, backends     |
| Dashboard included       | Yes (built-in)      | No (needs Grafana, Jaeger, etc.)    |
| Automatic instrumentation| Yes                 | Via separate packages               |
| Production use           | Yes (SQLite, auth)  | Yes                                 |
| Enterprise features      | No                  | Yes                                 |

For a detailed comparison, see [Sysko vs OpenTelemetry](/guides/vs-otel).
