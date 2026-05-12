---
title: Fastify plugin
description: Instrumenting Fastify apps with Sysko.
---

The Fastify plugin captures the route template (`/users/:id`) from every request via Fastify's hook system.

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentFastify } from "@syskoio/plugins/fastify";
import Fastify from "fastify";

const sysko = await init({ serviceName: "my-app" });
const app = Fastify();

instrumentFastify(app);

app.get("/users/:id", async (request) => {
  return { id: request.params.id };
});

await app.listen({ port: 3000 });
```

## How it works

`instrumentFastify` registers an `onRequest` hook that reads `request.routeOptions.url` (the template path) and writes it to the active span's `http.route` attribute.
