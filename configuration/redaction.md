---
title: PII redaction
description: Removing sensitive data from spans before they are stored.
---

The `redact` option prevents sensitive data from reaching Sysko's storage or dashboard.

```ts
await init({
  serviceName: "my-app",
  redact: {
    paths: ["/healthz", "/internal/*"],
    queryParams: ["token", "apiKey", "password"],
  },
});
```

## Dropping paths

`redact.paths` lists URL paths whose spans should be discarded entirely. The span is never stored or sent to the dashboard.

Entries can be:
- **Exact strings**: `"/healthz"`
- **Glob patterns** (using `*`): `"/internal/*"` matches `/internal/metrics`, `/internal/ping`, etc.
- **Regular expressions**: `/^\/admin\/.*/`

```ts
redact: {
  paths: ["/healthz", "/internal/*", /^\/admin\//],
}
```

## Masking query parameters

`redact.queryParams` lists query parameter names whose values are replaced with `[REDACTED]` in the `http.url` attribute.

```ts
redact: {
  queryParams: ["token", "apiKey", "session_id"],
}
```

A URL like `/search?q=hello&token=abc123` becomes `/search?q=hello&token=[REDACTED]` in the stored span.

## Using the hook API for custom redaction

For more complex cases, use `sysko.onSpan()` to inspect and mutate every span before it is stored:

```ts
sysko.onSpan((span) => {
  if (span.attributes["http.url"]?.includes("secret")) {
    return null; // discard entirely
  }
  delete span.attributes["sensitive.field"];
  return span;
});
```

See [init() options — onSpan](/configuration/init-options#return-value) for full API details.
