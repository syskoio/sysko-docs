---
title: TypeORM plugin
description: Tracing TypeORM database operations with Sysko.
---

The TypeORM plugin traces entity operations via a TypeORM subscriber.

## Installation

```sh
npm install @syskoio/plugins
```

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentTypeORM } from "@syskoio/plugins";
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
