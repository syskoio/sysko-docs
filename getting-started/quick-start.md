---
title: Quick Start
description: Get Sysko running in under 2 minutes.
---

# Quick Start

## 1. Install

```sh
npm install @syskoio/core
```

## 2. Add `init()` to your entry file

Call `sysko.init()` before anything else in your application — before routes, middleware, or any other imports that make network calls.

```ts
import { init } from "@syskoio/core";

const sysko = await init({ serviceName: "my-app" });

// rest of your app...
```

That is it. Sysko is now:
- Tracing every inbound HTTP request
- Tracing every outbound HTTP/fetch call as a child span
- Capturing `console.*` logs and associating them with the active span
- Catching uncaught errors and marking the current span as failed

## 3. Open the dashboard

Navigate to [http://localhost:9999](http://localhost:9999) in your browser.

Make a request to your app — the span appears in the dashboard immediately.

---

## With Express

```ts
import { init } from "@syskoio/core";
import { instrumentExpress } from "@syskoio/plugins/express";
import express from "express";

const sysko = await init({ serviceName: "my-app" });
const app = express();

instrumentExpress(app); // adds http.route like /users/:id

app.get("/users/:id", async (req, res) => {
  // any db call, fetch, etc. here becomes a child span automatically
  res.json({ id: req.params.id });
});

app.listen(3000);
```

## With Fastify

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

## What the dashboard shows

Once spans appear, click any row to open the detail panel. You will see:

- **Waterfall view** — hierarchical spans with time bars, showing which calls happened and how long they took
- **Logs** — any `console.*` calls made during the request, inline in the waterfall
- **Attributes** — HTTP method, URL, status code, route template, database operation, and more

## Next steps

- [Configure storage, sampling, and auth](/configuration/init-options)
- [Add a plugin for your ORM or cache](/plugins/express)
- [Set up distributed tracing](/guides/distributed-tracing)
