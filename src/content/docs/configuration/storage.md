---
title: Storage
description: Configuring where Sysko stores spans.
---

Sysko supports three storage modes, configured via the `storage` option in `init()`.

## SQLite (default)

```ts
await init({ serviceName: "my-app", storage: "sqlite" });
// stores at ~/.sysko/my-app.db
```

SQLite is the default. Spans survive process restarts and are available when the dashboard reconnects. Uses WAL mode for performance under concurrent reads.

To use a custom path:

```ts
await init({ serviceName: "my-app", storage: { path: "/var/data/sysko.db" } });
```

## In-memory

```ts
await init({ serviceName: "my-app", storage: "memory" });
```

All spans are kept in a ring buffer in-process. Lost on restart. Suitable for development, testing, or ephemeral environments where persistence is not needed.

## Retention

Both storage modes respect the `retention` option:

```ts
await init({
  serviceName: "my-app",
  retention: { days: 3, maxRows: 2000 },
});
```

- `days` — spans older than this are deleted hourly.
- `maxRows` — oldest rows are pruned when the count exceeds this limit (checked every 100 inserts).
