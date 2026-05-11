---
title: Sequelize plugin
description: Tracing Sequelize database operations with Sysko.
---

## Usage

```ts
import { init } from "@sysko/core";
import { instrumentSequelize } from "@sysko/plugins/sequelize";
import { Sequelize } from "sequelize";

const sysko = await init({ serviceName: "my-app" });
const sequelize = new Sequelize("sqlite::memory:");

instrumentSequelize(sequelize);
```

Uses `beforeFind`/`afterFind`/`beforeCreate` hooks to wrap queries in child spans.

## Span attributes

| Attribute | Example |
|---|---|
| `db.system` | `"sqlite"` / `"postgres"` |
| `db.operation` | `"find"` / `"create"` |
| `db.model` | `"User"` |
