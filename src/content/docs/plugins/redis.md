---
title: Redis plugin
description: Tracing Redis cache operations with Sysko.
---

The Redis plugin instruments `ioredis` and `redis` clients, creating a child span for every cache operation.

## Usage

```ts
import { init } from "@sysko/core";
import { instrumentRedis } from "@sysko/plugins/redis";
import Redis from "ioredis";

const sysko = await init({ serviceName: "my-app" });
const redis = new Redis();

instrumentRedis(redis);

// Every command now creates a child span
await redis.get("user:1");
await redis.set("user:1", JSON.stringify(user));
```

## Span attributes

Each `cache.*` span includes:

| Attribute | Example |
|---|---|
| `cache.system` | `"redis"` |
| `cache.operation` | `"get"` |
| `cache.key` | `"user:1"` |
| `cache.hit` | `true` / `false` |
