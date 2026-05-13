---
title: pg (node-postgres) plugin
description: Tracing raw pg queries with Sysko.
---

The pg plugin creates a child span for every query executed via a `pg.Client` instance.

## Installation

```sh
npm install @syskoio/plugins
```

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentPgClient } from "@syskoio/plugins";
import { Client } from "pg";

const sysko = await init({ serviceName: "my-app" });
const client = new Client({ connectionString: "postgres://..." });

await client.connect();
instrumentPgClient(client);

// Every query is now a child span
await client.query("SELECT * FROM users WHERE id = $1", [1]);
```

Works with individual `Client` instances. If you use a `Pool`, instrument each client as it is acquired.

## Span attributes

| Attribute | Example |
|---|---|
| `db.system` | `"postgresql"` |
| `db.statement` | `"SELECT * FROM users WHERE id = $1"` |
