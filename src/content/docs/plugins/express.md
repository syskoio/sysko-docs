---
title: Express plugin
description: Instrumenting Express.js apps with Sysko.
---

The Express plugin captures the **route template** (`/users/:id` instead of `/users/123`) from every request, giving you meaningful endpoint grouping in the dashboard.

## Installation

```sh
npm install @sysko/plugins
```

## Usage

Call `instrumentExpress` after creating your app and after calling `sysko.init()`:

```ts
import { init } from "@sysko/core";
import { instrumentExpress } from "@sysko/plugins/express";
import express from "express";

const sysko = await init({ serviceName: "my-app" });
const app = express();

instrumentExpress(app);

app.get("/users/:id", async (req, res) => {
  res.json({ id: req.params.id });
});

app.listen(3000);
```

## What it adds

Without the plugin, the `http.route` attribute is absent — the dashboard groups all requests under their raw URL path.

With the plugin, the span gets `http.route: "/users/:id"`, which enables:

- Correct endpoint aggregation in the "Endpoints" tab
- Grouping of parameterized routes (all `/users/1`, `/users/2`, etc. appear as one row)

## How it works

`instrumentExpress` uses `app.use` to register a middleware that calls `res.prependOnceListener("finish", ...)`. This runs before Sysko's own finalize step, ensuring the route template is available when the span is closed.
