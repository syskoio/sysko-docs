---
title: Axios plugin
description: Tracing outbound Axios requests with Sysko.
---

The Axios plugin creates a child span for every outbound HTTP request made with Axios.

## Installation

```sh
npm install @syskoio/plugins
```

## Usage

```ts
import { init } from "@syskoio/core";
import { instrumentAxios } from "@syskoio/plugins";
import axios from "axios";

const sysko = await init({ serviceName: "my-app" });

instrumentAxios(axios);

// Every axios request is now a child span
const { data } = await axios.get("https://api.example.com/users");
```

`instrumentAxios` uses Axios interceptors. You can also pass a custom axios instance instead of the global one.

## Note on native fetch

Outbound calls using the native `fetch` API are instrumented automatically by Sysko without any plugin — you only need this plugin if you are using Axios specifically.
