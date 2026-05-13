---
title: BullMQ plugin
description: Tracing BullMQ jobs with Sysko.
---

The BullMQ plugin traces job enqueue and consume operations.

## Installation

```sh
npm install @syskoio/plugins
```

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentBullMQQueue, instrumentBullMQProcessor } from "@syskoio/plugins";
import { Queue, Worker } from "bullmq";

const sysko = await init({ serviceName: "my-app" });

// Instrument the queue — wraps queue.add in a queue.publish span.
const queue = new Queue("emails");
instrumentBullMQQueue(queue);

// Instrument the processor — wraps the handler in a queue.consume span.
const worker = new Worker(
  "emails",
  instrumentBullMQProcessor(async (job) => {
    // process job
  }),
);
```

## Span attributes

| Span kind | Attribute | Example |
|---|---|---|
| `queue.publish` | `queue.name` | `"emails"` |
| `queue.publish` | `job.name` | `"send-welcome"` |
| `queue.consume` | `queue.name` | `"emails"` |
| `queue.consume` | `job.id` | `"42"` |
