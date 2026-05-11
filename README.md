# sysko-docs

Documentation site for [Sysko Observe](https://github.com/syskoio/sysko) — a zero-config observability library for Node.js.

Built with [Astro](https://astro.build) + [Starlight](https://starlight.astro.build).

## Development

```sh
npm install
npm run dev       # http://localhost:4321
```

## Build

```sh
npm run build     # output → ./dist/
npm run preview   # preview the build locally
```

## Docker

```sh
docker build -t sysko-docs .
docker run -p 80:80 sysko-docs
```

The image uses a multi-stage build: `node:20-alpine` to compile the static site, `nginx:alpine` to serve it.

## Structure

```
src/
  content/
    docs/
      getting-started/   # Introduction, Installation, Quick Start
      concepts/          # How tracing works, Spans & traces, Dashboard
      configuration/     # init() options, Storage, Sampling, Redaction, Alerts, Auth
      plugins/           # Express, Fastify, Prisma, Redis, Axios, BullMQ, Mongoose, ...
      reference/         # API reference
      guides/            # Distributed tracing, Production checklist, Collector, vs OTel
  styles/
    custom.css           # Theme overrides (dark, lime #bef264)
astro.config.mjs         # Starlight config + sidebar
Dockerfile
```
