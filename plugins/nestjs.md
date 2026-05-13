---
title: NestJS
description: Instrumenting NestJS apps with Sysko.
---

NestJS uses Express under the hood by default, so the setup combines `sysko.init()` (automatic HTTP tracing) with `instrumentExpress` (route template extraction).

## Installation

```sh
npm install @syskoio/core @syskoio/plugins
```

## tsconfig requirements

NestJS decorators require two compiler flags that are off by default:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "isolatedModules": false
  }
}
```

No changes to `module` or `moduleResolution` are needed — Sysko is imported from the package root, which resolves correctly under any standard NestJS tsconfig.

## Usage

```ts
// main.ts
import "reflect-metadata";
import { init } from "@syskoio/core";
import { instrumentExpress } from "@syskoio/plugins";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module.js";

// init() MUST run before NestFactory.create() so the HTTP monkeypatch
// is active before the underlying http.Server is created.
await init({ serviceName: "my-nest-app" });

const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  logger: false,
});

// Pass the raw Express instance so Sysko can read route templates.
instrumentExpress(app.getHttpAdapter().getInstance());

await app.listen(3000);
```

A minimal controller:

```ts
// app.controller.ts
import { Controller, Get, Param } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("/users/:id")
  getUser(@Param("id") id: string) {
    return { id };
  }
}
```

## What gets traced automatically

Once `init()` is called, Sysko instruments:

- Every inbound HTTP request as an `http.server` span, including method, path, status code, and duration
- Outbound `fetch` / `http.request` calls as `http.client` child spans
- `console.log/warn/error` output attached to the active span as logs
- Unhandled exceptions and rejected promises marked as `status: "error"`

`instrumentExpress` adds `http.route` (e.g. `/users/:id`) so the Endpoints tab groups parameterized routes correctly.

## Manual spans

Use `withSpan` for work you want to measure inside a request:

```ts
import { withSpan } from "@syskoio/core";

@Get("/report")
async getReport() {
  return withSpan({ kind: "internal", name: "build-report" }, async () => {
    // expensive work here
    return { rows: 42 };
  });
}
```

## W3C traceparent propagation

Sysko reads the `traceparent` header on inbound requests and injects it on outbound `fetch` calls automatically. Cross-service traces are linked in the dashboard without any extra configuration.
