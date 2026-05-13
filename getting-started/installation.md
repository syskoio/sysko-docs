---
title: Installation
description: Installing Sysko in a Node.js project.
---

# Installation

Sysko requires **Node.js 20 or later**.

## Install the core package

::: code-group

```sh [npm]
npm install @syskoio/core
```

```sh [pnpm]
pnpm add @syskoio/core
```

```sh [yarn]
yarn add @syskoio/core
```

:::

## Optional: framework plugins

Install `@syskoio/plugins` if you want richer instrumentation for Express, Fastify, Prisma, Redis, and more:

::: code-group

```sh [npm]
npm install @syskoio/plugins
```

```sh [pnpm]
pnpm add @syskoio/plugins
```

```sh [yarn]
yarn add @syskoio/plugins
```

:::

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

Go to the [Quick Start](/getting-started/quick-start) to see Sysko running in your app.
