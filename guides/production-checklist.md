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

## Running inside Docker

When Sysko runs inside a Docker container, the default `host: "127.0.0.1"` binds the dashboard to the container's loopback interface only. The dashboard starts successfully but is unreachable from outside the container — no reverse proxy or port mapping will reach it.

Set `host: "0.0.0.0"` to bind to all interfaces and always pair it with a password:

```ts
dashboard: {
  host: "0.0.0.0",
  port: 9999,
  password: process.env.SYSKO_PASSWORD,
},
```

Make sure the Dockerfile exposes the port:

```dockerfile
EXPOSE 3000
EXPOSE 9999
```

### PaaS platforms (CapRover, Railway, Render, Fly.io)

These platforms route HTTP traffic through a reverse proxy, typically to a single port per app. To make the dashboard accessible:

- **CapRover:** in "HTTP Settings", add a second domain (e.g. `dashboard.myapp.example.com`) pointing to port `9999`. CapRover will provision HTTPS automatically.
- **Railway / Render:** expose port `9999` as an additional service port in the platform settings and point a custom domain or the generated URL to it.
- **Fly.io:** add a second `[[services]]` block in `fly.toml` for port `9999`.

### SQLite inside Docker

The default SQLite path is `~/.sysko/<serviceName>.db` (inside the container's home directory). Mount a volume to persist spans across restarts:

```dockerfile
VOLUME ["/data/sysko"]
```

```ts
storage: { path: "/data/sysko/spans.db" },
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
