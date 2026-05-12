---
title: Prisma plugin
description: Tracing Prisma database queries with Sysko.
---

The Prisma plugin creates a child span for every database query, capturing the operation, model, and duration.

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentPrisma } from "@syskoio/plugins/prisma";
import { PrismaClient } from "@prisma/client";

const sysko = await init({ serviceName: "my-app" });
const prisma = new PrismaClient();

instrumentPrisma(prisma);

// Every query now creates a child span automatically
const user = await prisma.user.findUnique({ where: { id: 1 } });
```

## Span attributes

Each `db.query` span includes:

| Attribute | Example |
|---|---|
| `db.system` | `"postgresql"` |
| `db.operation` | `"findUnique"` |
| `db.model` | `"user"` |

## How it works

`instrumentPrisma` uses Prisma's `$use` middleware to wrap every query in a span. The span is opened before the query executes and closed (with duration) when the promise resolves or rejects.
