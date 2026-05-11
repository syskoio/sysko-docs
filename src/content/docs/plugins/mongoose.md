---
title: Mongoose plugin
description: Tracing Mongoose database operations with Sysko.
---

## Usage

```ts
import { init } from "@sysko/core";
import { instrumentMongoose } from "@sysko/plugins/mongoose";
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
