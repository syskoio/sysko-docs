---
title: API Reference
description: Complete API reference for @syskoio/core.
---

## init(options)

Initializes Sysko. Must be called before any other imports that make network calls.

Returns a `Promise<SyskoHandle>`.

```ts
import { init } from "@syskoio/core";

const sysko = await init({ serviceName: "my-app" });
```

See [init() options](/configuration/init-options/) for the full options reference.

---

## startSpan(options)

Opens a new span manually. You are responsible for closing it by calling `span.end()`.

```ts
import { startSpan } from "@syskoio/core";

const span = startSpan({ kind: "internal", name: "my-operation" });
span.setAttribute("custom.key", "value");

try {
  await doWork();
  span.end();
} catch (err) {
  span.end(err); // marks span as error, attaches error.message and error.stack
}
```

If called within an active context, the new span becomes a child of the current span automatically.

---

## withSpan(options, fn)

Opens a span, runs `fn`, and closes the span when the function resolves or rejects.

```ts
import { withSpan } from "@syskoio/core";

const result = await withSpan({ kind: "internal", name: "my-operation" }, async () => {
  return await doWork();
});
```

Equivalent to `startSpan` + `try/catch/span.end()` but less verbose.

---

## getCurrentTraceId()

Returns the `traceId` of the currently active span, or `undefined` if called outside of an active context.

```ts
import { getCurrentTraceId } from "@syskoio/core";

app.get("/", (req, res) => {
  const traceId = getCurrentTraceId();
  res.setHeader("X-Trace-Id", traceId ?? "");
  res.json({ ok: true });
});
```

---

## sysko.onSpan(hook)

Registers a hook that is called for every span before it is stored. Return the (optionally mutated) span, or `null` to discard it.

```ts
sysko.onSpan((span) => {
  if (span.attributes["http.route"] === "/internal/healthz") {
    return null; // discard
  }
  span.attributes["tenant.id"] = getTenantId();
  return span;
});
```

Multiple hooks can be registered. They run in registration order. If any hook returns `null`, the span is discarded and subsequent hooks are skipped.

Returns a cleanup function that removes the hook.

---

## sysko.log(level, message)

Associates a log entry with the currently active span.

```ts
sysko.log("info", "processing started");
sysko.log("warn", "cache miss for key: user:1");
sysko.log("error", "payment gateway timeout");
```

Equivalent to calling `console.log/warn/error`, which Sysko patches automatically. Use this API if you want to log without the message appearing in the process stdout.

---

## sysko.shutdown()

Flushes pending spans, stops the transport server, and closes the storage connection. Called automatically on `SIGTERM` and `SIGINT`.

```ts
await sysko.shutdown();
```
