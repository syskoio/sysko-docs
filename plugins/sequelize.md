---
title: Sequelize plugin
description: Tracing Sequelize database operations with Sysko.
---

The Sequelize plugin traces database operations via `beforeFind`/`afterFind`/`beforeCreate` hooks.

## Installation

```sh
npm install @syskoio/plugins
```

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentSequelize } from "@syskoio/plugins";
import { Sequelize } from "sequelize";

const sysko = await init({ serviceName: "my-app" });
const sequelize = new Sequelize("sqlite::memory:");

instrumentSequelize(sequelize);
```

## Span attributes

| Attribute | Example |
|---|---|
| `db.system` | `"sqlite"` / `"postgres"` |
| `db.operation` | `"find"` / `"create"` |
| `db.model` | `"User"` |
