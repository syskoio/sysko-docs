---
layout: home

hero:
  name: Sysko
  text: Chrome DevTools for Node.js
  tagline: Zero-config observability with automatic tracing and a real-time dashboard. Up and running in under 2 minutes.
  image:
    src: /logo.png
    alt: Sysko
  actions:
    - theme: brand
      text: Quick Start
      link: /getting-started/quick-start
    - theme: alt
      text: View on GitHub
      link: https://github.com/syskoio/sysko

features:
  - icon: 🚀
    title: Zero config
    details: Call sysko.init() and you are done. No YAML, no exporters, no infrastructure to set up.
  - icon: ⚡
    title: Automatic tracing
    details: HTTP in/out, database queries, console logs, and errors captured automatically via AsyncLocalStorage. No manual instrumentation.
  - icon: 📊
    title: Real-time dashboard
    details: A built-in dashboard streams spans to your browser instantly. No Prometheus, no Grafana, no Loki.
  - icon: 🛡️
    title: Production ready
    details: SQLite persistence, sampling, PII redaction, rate limiting, auth, and alerts — all configurable.
---
