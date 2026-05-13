---
title: BullMQ plugin
description: Tracing BullMQ jobs with Sysko.
---

The BullMQ plugin traces job enqueue and consume operations.

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentBullMQ } from "@syskoio/plugins/bullmq";
import { Queue, Worker } from "bullmq";

const sysko = await init({ serviceName: "my-app" });

const queue = new Queue("emails");
const worker = new Worker("emails", async (job) => { /* process */ });

instrumentBullMQ(queue, worker);
```

## Span attributes

| Span kind | Attribute | Example |
|---|---|---|
| `queue.publish` | `queue.name` | `"emails"` |
| `queue.publish` | `job.name` | `"send-welcome"` |
| `queue.consume` | `queue.name` | `"emails"` |
| `queue.consume` | `job.id` | `"42"` |
