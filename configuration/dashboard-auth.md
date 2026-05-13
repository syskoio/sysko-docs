---
title: Dashboard auth
description: Protecting the Sysko dashboard with a password.
---

By default, the Sysko dashboard is only accessible on `127.0.0.1` (localhost). If you expose it on a non-loopback address, protect it with a password.

```ts
await init({
  serviceName: "my-app",
  dashboard: {
    port: 9999,
    host: "0.0.0.0", // listen on all interfaces
    password: "your-secret-password",
  },
});
```

When `password` is set:

- The dashboard shows a login screen before any data is visible.
- The WebSocket connection requires the password as a base64-encoded query parameter.
- Brute-force protection is active: **5 failed attempts per IP trigger a 5-minute lockout**.

Static assets (JS, CSS) are served without authentication so the React app can load before the login form renders.

## Accessing the dashboard remotely

If your app runs on a remote server and you want to view the dashboard locally, use an SSH tunnel instead of exposing the port publicly:

```sh
ssh -L 9999:127.0.0.1:9999 user@your-server
```

Then open `http://localhost:9999` in your local browser.
