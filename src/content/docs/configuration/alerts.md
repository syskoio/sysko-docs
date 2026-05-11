---
title: Alerts
description: Configuring threshold-based alerts with webhook notifications.
---

Sysko can fire alerts when metrics cross configured thresholds. Alerts appear in the dashboard "Alerts" tab and can send a webhook payload to any HTTP endpoint (Slack, Discord, PagerDuty, etc.).

```ts
await init({
  serviceName: "my-app",
  alerts: [
    {
      name: "high-error-rate",
      type: "errorRate",
      threshold: 0.3,
      windowMs: 60_000,
      cooldownMs: 300_000,
      webhook: "https://hooks.slack.com/services/...",
    },
    {
      name: "slow-p95",
      type: "p95",
      threshold: 2000,
      windowMs: 120_000,
    },
  ],
});
```

## Alert rule fields

| Field | Type | Required | Description |
|---|---|---|---|
| `name` | `string` | Yes | Unique identifier shown in the dashboard. |
| `type` | `"errorRate" \| "p95" \| "spanCount"` | Yes | Metric to evaluate. |
| `threshold` | `number` | Yes | Value that triggers the alert. |
| `windowMs` | `number` | Yes | Time window in milliseconds over which the metric is evaluated. |
| `cooldownMs` | `number` | No | Minimum time between firings of the same rule. Default: `300_000` (5 min). |
| `webhook` | `string` | No | HTTP POST endpoint to call when the alert fires. |

## Alert types

### `errorRate`

Fires when the fraction of spans with `status: "error"` exceeds `threshold` within `windowMs`.

`threshold: 0.3` means 30% error rate.

### `p95`

Fires when the 95th-percentile span duration (in milliseconds) exceeds `threshold` within `windowMs`.

`threshold: 2000` means p95 > 2 seconds.

### `spanCount`

Fires when the total number of spans within `windowMs` exceeds `threshold`.

Useful as a basic traffic spike detector.

## Webhook payload

When a webhook URL is configured, Sysko sends a POST request with `Content-Type: application/json`:

```json
{
  "alert": "high-error-rate",
  "type": "errorRate",
  "value": 0.42,
  "threshold": 0.3,
  "windowMs": 60000,
  "firedAt": "2024-11-01T12:34:56.789Z",
  "service": "my-app"
}
```

This format is compatible with Slack incoming webhooks (wrap it in a `text` field using `onSpan` or a proxy), Discord webhooks, and any generic HTTP receiver.
