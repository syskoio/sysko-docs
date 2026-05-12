---
title: Installation
description: Installing Sysko in a Node.js project.
---

import { Tabs, TabItem } from "@astrojs/starlight/components";

Sysko requires **Node.js 20 or later**.

## Install the core package

<Tabs>
  <TabItem label="npm">
    ```sh
    npm install @syskoio/core
    ```
  </TabItem>
  <TabItem label="pnpm">
    ```sh
    pnpm add @syskoio/core
    ```
  </TabItem>
  <TabItem label="yarn">
    ```sh
    yarn add @syskoio/core
    ```
  </TabItem>
</Tabs>

## Optional: framework plugins

Install `@syskoio/plugins` if you want richer instrumentation for Express, Fastify, Prisma, Redis, and more:

<Tabs>
  <TabItem label="npm">
    ```sh
    npm install @syskoio/plugins
    ```
  </TabItem>
  <TabItem label="pnpm">
    ```sh
    pnpm add @syskoio/plugins
    ```
  </TabItem>
  <TabItem label="yarn">
    ```sh
    yarn add @syskoio/plugins
    ```
  </TabItem>
</Tabs>

## TypeScript

Sysko is written in TypeScript and ships its own types. No `@types/*` package needed.

Your `tsconfig.json` should target at least ES2022 and use `moduleResolution: "NodeNext"` or `"Bundler"`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext"
  }
}
```

## Next step

Go to the [Quick Start](/getting-started/quick-start/) to see Sysko running in your app.
