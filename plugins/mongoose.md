---
title: Mongoose plugin
description: Tracing Mongoose database operations with Sysko.
---

The Mongoose plugin creates a child span for every database operation via Mongoose's `pre` hooks.

## Installation

```sh
npm install @syskoio/plugins
```

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentMongoose } from "@syskoio/plugins";
import mongoose from "mongoose";

const sysko = await init({ serviceName: "my-app" });

instrumentMongoose(mongoose);

await mongoose.connect("mongodb://localhost/myapp");
```

## Span attributes

| Attribute | Example |
|---|---|
| `db.system` | `"mongodb"` |
| `db.operation` | `"find"` / `"save"` |
| `db.collection` | `"users"` |
