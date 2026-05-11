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
    npm install @sysko/core
    ```
  </TabItem>
  <TabItem label="pnpm">
    ```sh
    pnpm add @sysko/core
    ```
  </TabItem>
  <TabItem label="yarn">
    ```sh
    yarn add @sysko/core
    ```
  </TabItem>
</Tabs>

## Optional: framework plugins

Install `@sysko/plugins` if you want richer instrumentation for Express, Fastify, Prisma, Redis, and more:

<Tabs>
  <TabItem label="npm">
    ```sh
    npm install @sysko/plugins
    ```
  </TabItem>
  <TabItem label="pnpm">
    ```sh
    pnpm add @sysko/plugins
    ```
  </TabItem>
  <TabItem label="yarn">
    ```sh
    yarn add @sysko/plugins
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
