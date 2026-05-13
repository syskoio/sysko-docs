---
title: ExpressoTS plugin
description: Instrumenting ExpressoTS apps with Sysko.
---

ExpressoTS uses Express under the hood, so the same `instrumentExpress` plugin is used. The only difference is how you get the app instance before calling `listen`.

## Installation

```sh
npm install @syskoio/plugins
```

## Usage

Call `instrumentExpress` after `sysko.init()` and before `app.listen()`:

```ts
import { init } from "@syskoio/core";
import { instrumentExpress } from "@syskoio/plugins";
import { AppFactory, ServerEnvironment } from "@expressots/core";
import { appContainer } from "./app.container";

const sysko = await init({ serviceName: "my-app" });

const app = AppFactory.create(appContainer, []);

instrumentExpress(app);

await app.listen(3000, ServerEnvironment.Development);
```

## What it adds

Without the plugin, `http.route` is absent and the dashboard groups all requests under their raw URL (`/users/123`, `/users/456`, etc.).

With the plugin, each span gets `http.route: "/users/:id"`, enabling correct endpoint aggregation in the **Endpoints** tab.

## Order matters

`sysko.init()` must be awaited before `AppFactory.create()`. If the app starts listening before `init()` resolves, the first requests will not be traced.
