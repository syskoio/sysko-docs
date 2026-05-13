---
title: init() options
description: Complete reference for all options accepted by sysko.init().
---

`init()` is the single entry point into Sysko. All options are optional — calling `init({ serviceName: "my-app" })` is enough to get started.

```ts
import { init } from "@syskoio/core";

const sysko = await init({
  serviceName: "my-app",
  storage: "sqlite",
  retention: { days: 7, maxRows: 5000 },
  sampling: 1,
  rateLimit: 500,
  redact: {
    paths: ["/healthz", "/internal/*"],
    queryParams: ["token", "apiKey"],
  },
  dashboard: {
    port: 9999,
    host: "127.0.0.1",
    password: "secret",
  },
  alerts: [
    { name: "high-error-rate", type: "errorRate", threshold: 0.3, windowMs: 60_000 },
  ],
  export: { url: "http://collector:9999" },
});
```

## Options

### `serviceName`

**Type:** `string` — **Required**

Identifies this service in the dashboard and in distributed traces. Used as the SQLite database filename (`~/.sysko/<serviceName>.db`) when `storage` is `"sqlite"`.

---

### `storage`

**Type:** `"sqlite" | "memory" | { path: string }` — **Default:** `"sqlite"`

Where spans are persisted.

| Value | Behavior |
|---|---|
| `"sqlite"` | Stores in `~/.sysko/<serviceName>.db`. Survives process restarts. |
| `"memory"` | In-process ring buffer. Lost on restart. Good for development or ephemeral environments. |
| `{ path: "/var/data/sysko.db" }` | SQLite at a custom path. |

---

### `retention`

**Type:** `{ days?: number; maxRows?: number }` — **Default:** `{ days: 7, maxRows: 5000 }`

Controls how long spans are kept in storage.

- `days` — spans older than this are pruned hourly.
- `maxRows` — when the table exceeds this size, the oldest rows are removed (checked every 100 inserts).

---

### `sampling`

**Type:** `number` between `0` and `1` — **Default:** `1` (100%)

Fraction of root spans to record. Child spans inherit the sampling decision of their root — a trace is either fully recorded or fully discarded.

Setting `sampling: 0.1` records 10% of traces. Unsampled spans use a zero-allocation no-op handle internally.

---

### `rateLimit`

**Type:** `number` (spans per second) — **Default:** `500`

Maximum number of spans recorded per second, enforced via a token bucket. Spans that exceed the limit are silently dropped.

---

### `redact`

**Type:** `{ paths?: string[]; queryParams?: string[] }`

Controls PII removal.

- `paths` — spans whose HTTP path matches any entry are discarded entirely. Supports glob patterns (`*`) and regular expressions.
- `queryParams` — query parameters with these names are replaced with `[REDACTED]` in `http.url`.

```ts
redact: {
  paths: ["/healthz", "/internal/*", /^\/admin\/.*/],
  queryParams: ["token", "apiKey", "password"],
}
```

---

### `dashboard`

**Type:** `{ port?: number; host?: string; password?: string }`

Controls the built-in dashboard server.

| Option | Default | Description |
|---|---|---|
| `port` | `9999` | Port the dashboard listens on. |
| `host` | `"127.0.0.1"` | Bind address. Use `"0.0.0.0"` to expose to the network. |
| `password` | — | When set, the dashboard shows a login screen. Brute-force protection: 5 attempts per IP, 5-minute lockout. |

---

### `alerts`

**Type:** `AlertRule[]`

Array of alert rules. Each rule fires when a threshold is breached and optionally sends a webhook.

```ts
alerts: [
  {
    name: "high-error-rate",
    type: "errorRate",
    threshold: 0.3,      // 30% error rate
    windowMs: 60_000,    // evaluated over the last 60 seconds
    cooldownMs: 300_000, // don't re-fire for 5 minutes
    webhook: "https://hooks.slack.com/...",
  },
]
```

Supported `type` values: `"errorRate"`, `"p95"`, `"spanCount"`.

See [Alerts](/configuration/alerts/) for full documentation.

---

### `export`

**Type:** `{ url: string }`

When set, spans are forwarded to a remote collector (such as `@syskoio/collector`) via HTTP POST to `url/v1/spans`, in addition to being stored locally.

---

## Return value

`init()` returns a `SyskoHandle` with these methods:

```ts
sysko.onSpan((span) => {
  // transform or discard each span before storage
  span.attributes["tenant"] = getTenantId();
  return span; // return null to discard
});

sysko.log("info", "message associated with the active span");

await sysko.shutdown(); // flush and close — called automatically on SIGTERM/SIGINT
```
