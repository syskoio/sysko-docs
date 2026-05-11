---
title: The dashboard
description: What the Sysko dashboard shows and how to use it.
---

The Sysko dashboard is a real-time web UI served by `@sysko/transport` on port `9999` (configurable). It receives spans over a WebSocket connection and updates instantly as your app handles requests.

Open it at [http://localhost:9999](http://localhost:9999) while your app is running.

## Tabs

### Spans

The main view. Shows every recorded span in reverse chronological order.

- Click a row to open the **detail panel** (waterfall + logs + attributes)
- Use the **filter bar** to narrow by search text, HTTP method, status range, or minimum duration
- Use **keyboard shortcuts** to navigate: `j`/`k` (next/prev), `/` (search), `Space` (pause), `c` (clear), `Esc` (close panel)

### Endpoints

Aggregated stats per route template:

- Request count
- Error rate
- p50, p95, p99, max latency
- Sortable by any column

### Distribution

Latency histogram with 12 buckets + summary statistics (count, min, avg, p50, p95, p99, max) for the current filter.

### Errors

Error groups aggregated by fingerprint (`error.name + top stack frame`). Each group shows:

- Total count and last occurrence
- 24-hour sparkline
- Link to a representative trace

### Alerts

History of fired alert rules with timestamp and breach value.

### System

Time-series graphs for process metrics:

- Event loop lag (ms)
- Heap used vs. heap total
- CPU usage (%)
- GC duration and type

## Detail panel

Click any span in the Spans tab to open the detail panel. It shows:

- **Waterfall** — hierarchical view of all spans in the trace, with time bars showing relative duration
- **Logs** — `console.*` calls made during the request, inline with timestamps
- **Attributes** — all span attributes as a key/value list

### Sharing and comparing

- **Copy link** — copies a URL with `#/trace/<id>` to the clipboard; anyone with dashboard access can open it directly
- **Download** — exports the trace as JSON (`sysko-trace-<id>.json`)
- **Compare** — enter comparison mode; selecting a second trace opens a split view with both detail panels side by side (`#/trace/<A>/vs/<B>`)
