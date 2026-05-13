import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Sysko",
  ignoreDeadLinks: "localhostLinks",
  description:
    "Chrome DevTools for Node.js backends. Zero-config observability with automatic tracing and a real-time dashboard.",

  head: [
    ["link", { rel: "icon", type: "image/png", href: "/logo.png" }],
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  ],

  themeConfig: {
    logo: "/logo.png",
    siteTitle: "Sysko",

    nav: [
      { text: "Docs", link: "/getting-started/introduction" },
      { text: "npm", link: "https://www.npmjs.com/package/@syskoio/core" },
    ],

    sidebar: [
      {
        text: "Getting Started",
        items: [
          { text: "Introduction", link: "/getting-started/introduction" },
          { text: "Installation", link: "/getting-started/installation" },
          { text: "Quick Start", link: "/getting-started/quick-start" },
        ],
      },
      {
        text: "Core Concepts",
        items: [
          { text: "How tracing works", link: "/concepts/how-tracing-works" },
          { text: "Spans and traces", link: "/concepts/spans-and-traces" },
          { text: "The dashboard", link: "/concepts/the-dashboard" },
        ],
      },
      {
        text: "Configuration",
        items: [
          { text: "init() options", link: "/configuration/init-options" },
          { text: "Storage", link: "/configuration/storage" },
          { text: "Sampling & rate limiting", link: "/configuration/sampling" },
          { text: "PII redaction", link: "/configuration/redaction" },
          { text: "Alerts", link: "/configuration/alerts" },
          { text: "Dashboard auth", link: "/configuration/dashboard-auth" },
        ],
      },
      {
        text: "Plugins",
        items: [
          { text: "Express", link: "/plugins/express" },
          { text: "ExpressoTS", link: "/plugins/expressots" },
          { text: "Fastify", link: "/plugins/fastify" },
          { text: "NestJS", link: "/plugins/nestjs" },
          { text: "Prisma", link: "/plugins/prisma" },
          { text: "Redis", link: "/plugins/redis" },
          { text: "Axios", link: "/plugins/axios" },
          { text: "BullMQ", link: "/plugins/bullmq" },
          { text: "Mongoose", link: "/plugins/mongoose" },
          { text: "Sequelize", link: "/plugins/sequelize" },
          { text: "TypeORM", link: "/plugins/typeorm" },
          { text: "pg (node-postgres)", link: "/plugins/pg" },
        ],
      },
      {
        text: "Guides",
        items: [
          {
            text: "Distributed tracing",
            link: "/guides/distributed-tracing",
          },
          {
            text: "Production checklist",
            link: "/guides/production-checklist",
          },
          { text: "Using the Collector", link: "/guides/collector" },
          { text: "Sysko vs OpenTelemetry", link: "/guides/vs-otel" },
        ],
      },
      {
        text: "API Reference",
        items: [{ text: "Overview", link: "/reference/example" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/syskoio/sysko" },
      { icon: "npm", link: "https://www.npmjs.com/package/@syskoio/core" },
    ],

    search: {
      provider: "local",
    },

    editLink: {
      pattern: "https://github.com/syskoio/sysko-docs/edit/main/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2025 Sysko",
    },
  },
});
