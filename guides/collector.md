---
title: Using the Collector
description: Running sysko-collector to aggregate spans from multiple services.
---

`@syskoio/collector` is a standalone agent that receives spans from multiple Sysko-instrumented services and serves a single aggregated dashboard.

## When to use it

Use the Collector when you have more than one service and want to:

- View traces across services in one place
- Keep a single persistent store instead of one per service
- Run the dashboard independently of your app processes

## Running with Docker

```sh
docker run -p 9999:9999 -v sysko-data:/data sysko/collector
```

Then configure each service to export to the Collector:

```ts
await init({
  serviceName: "my-app",
  export: { url: "http://collector:9999" },
});
```

## Running as a Node.js process

```sh
npx sysko-collector --port 9999 --storage /var/data/collector.db
```

## How it works

The Collector runs `@syskoio/transport` with `ingest: true` mode, which exposes a `POST /v1/spans` endpoint. Each service's `SpanExporter` batches spans and sends them there.

The Collector's dashboard shows spans from all services, with `service.name` badges and the service filter in the filter bar.

## Spans are still stored locally

By default, spans are stored in both the local service's store **and** the Collector. You can disable local storage if you prefer central-only:

```ts
await init({
  serviceName: "my-app",
  storage: "memory",                  // no local persistence
  retention: { maxRows: 0 },          // no local buffer
  export: { url: "http://collector:9999" },
});
```
