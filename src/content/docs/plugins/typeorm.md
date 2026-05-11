---
title: TypeORM plugin
description: Tracing TypeORM database operations with Sysko.
---

## Usage

```ts
import { init } from "@sysko/core";
import { instrumentTypeORM } from "@sysko/plugins/typeorm";
import { DataSource } from "typeorm";

const sysko = await init({ serviceName: "my-app" });

const dataSource = new DataSource({ type: "sqlite", database: ":memory:" });
await dataSource.initialize();

instrumentTypeORM(dataSource);
```

Uses a TypeORM subscriber to intercept entity operations.

## Span attributes

| Attribute | Example |
|---|---|
| `db.system` | `"sqlite"` / `"postgres"` |
| `db.operation` | `"insert"` / `"update"` / `"remove"` |
| `db.entity` | `"User"` |
