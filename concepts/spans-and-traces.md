---
title: Spans and traces
description: Understanding the data model behind Sysko's tracing.
---

## Span

A span represents a single unit of work: an inbound request, a database query, an outbound HTTP call, a custom operation.

Every span has:

| Field | Description |
|---|---|
| `spanId` | Unique identifier for this span |
| `traceId` | Identifier shared by all spans in the same trace |
| `parentSpanId` | The span that created this one (absent on root spans) |
| `name` | Human-readable label (`http.server`, `db.query`, `cache.get`, etc.) |
| `kind` | `"server"`, `"client"`, or `"internal"` |
| `startTime` | High-resolution timestamp (from `perf_hooks`) |
| `duration` | Duration in milliseconds |
| `status` | `"ok"` or `"error"` |
| `attributes` | Key/value map of metadata |

## Trace

A trace is a collection of spans that share the same `traceId`. It represents the full journey of a single request through your system — including all database queries, cache lookups, and outbound calls made during that request.

In the dashboard, a trace is shown as a **waterfall**: the root span at the top, child spans indented below it, each with a time bar showing when it started and how long it ran relative to the root.

## Attributes

Attributes carry the meaningful metadata for each span. Sysko sets standard attributes automatically:

**HTTP server spans:**
- `http.method` — `"GET"`, `"POST"`, etc.
- `http.url` — full request URL (query params redacted if configured)
- `http.status_code` — response status
- `http.route` — route template, if a framework plugin is active (e.g., `/users/:id`)

**HTTP client spans:**
- `http.method`, `http.url`, `http.status_code`
- `http.target` — the URL being called

**Database spans:**
- `db.system` — `"postgresql"`, `"mongodb"`, `"redis"`, etc.
- `db.operation` — `"find"`, `"insert"`, `"get"`, etc.
- `db.model` or `db.collection` — the entity/table/collection

**Error spans:**
- `error.message`
- `error.stack`
- `error.type` — the error class name

## Custom spans

You can create your own spans for any operation worth measuring:

```ts
import { withSpan, startSpan } from "@syskoio/core";

// wraps an async function (auto-closes on resolve or reject)
const result = await withSpan({ kind: "internal", name: "process-image" }, async () => {
  return await processImage(file);
});

// manual open/close
const span = startSpan({ kind: "internal", name: "batch-job" });
span.setAttribute("batch.size", items.length);
try {
  await processBatch(items);
  span.end();
} catch (err) {
  span.end(err);
}
```
