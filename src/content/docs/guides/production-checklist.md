---
title: Production checklist
description: What to configure before running Sysko in production.
---

Sysko works out of the box in development. For production, review each item below.

## Storage

Use `"sqlite"` (the default) or a custom path. SQLite with WAL is suitable for most production workloads.

```ts
await init({
  serviceName: "my-app",
  storage: "sqlite", // or { path: "/var/data/sysko.db" }
  retention: { days: 7, maxRows: 10_000 },
});
```

Avoid `"memory"` in production — spans are lost on restart.

## Sampling

Record a fraction of traces to reduce storage and CPU overhead:

```ts
sampling: 0.1, // 10% of traces
```

Start with `1` (100%) and reduce if you observe CPU or storage pressure.

## Rate limiting

Set a cap to protect against traffic spikes:

```ts
rateLimit: 200, // spans per second
```

## PII redaction

Identify any paths or query parameters that may contain sensitive data:

```ts
redact: {
  paths: ["/healthz", "/internal/*"],
  queryParams: ["token", "apiKey", "authorization"],
},
```

## Dashboard auth

If the dashboard port is reachable from outside localhost, set a password:

```ts
dashboard: {
  host: "127.0.0.1", // default; only reachable locally
  password: process.env.SYSKO_PASSWORD,
},
```

Use an SSH tunnel to access the dashboard from a remote server without exposing the port.

## Alerts

Configure at least an error rate alert:

```ts
alerts: [
  {
    name: "high-error-rate",
    type: "errorRate",
    threshold: 0.05, // 5%
    windowMs: 60_000,
    webhook: process.env.ALERT_WEBHOOK_URL,
  },
],
```

## Graceful shutdown

Sysko registers `SIGTERM` and `SIGINT` handlers automatically. If you manage shutdown yourself, call `sysko.shutdown()` explicitly:

```ts
process.on("SIGTERM", async () => {
  await sysko.shutdown();
  process.exit(0);
});
```

## Example: full production config

```ts
const sysko = await init({
  serviceName: "my-app",
  storage: "sqlite",
  retention: { days: 7, maxRows: 10_000 },
  sampling: 0.2,
  rateLimit: 300,
  redact: {
    paths: ["/healthz", "/ready"],
    queryParams: ["token", "apiKey"],
  },
  dashboard: {
    host: "127.0.0.1",
    password: process.env.SYSKO_PASSWORD,
  },
  alerts: [
    {
      name: "error-rate",
      type: "errorRate",
      threshold: 0.05,
      windowMs: 60_000,
      webhook: process.env.ALERT_WEBHOOK_URL,
    },
  ],
});
```
