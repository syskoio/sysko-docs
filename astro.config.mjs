// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Sysko",
      favicon: { href: "/logo.png", type: "image/png" },
      description:
        "Chrome DevTools for Node.js backends. Zero-config observability with automatic tracing and a real-time dashboard.",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/leonardoreis/sysko",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          items: [
            { label: "Introduction", slug: "getting-started/introduction" },
            { label: "Installation", slug: "getting-started/installation" },
            { label: "Quick Start", slug: "getting-started/quick-start" },
          ],
        },
        {
          label: "Core Concepts",
          items: [
            { label: "How tracing works", slug: "concepts/how-tracing-works" },
            { label: "Spans and traces", slug: "concepts/spans-and-traces" },
            { label: "The dashboard", slug: "concepts/the-dashboard" },
          ],
        },
        {
          label: "Configuration",
          items: [
            { label: "init() options", slug: "configuration/init-options" },
            { label: "Storage", slug: "configuration/storage" },
            { label: "Sampling & rate limiting", slug: "configuration/sampling" },
            { label: "PII redaction", slug: "configuration/redaction" },
            { label: "Alerts", slug: "configuration/alerts" },
            { label: "Dashboard auth", slug: "configuration/dashboard-auth" },
          ],
        },
        {
          label: "Plugins",
          items: [
            { label: "Express", slug: "plugins/express" },
            { label: "Fastify", slug: "plugins/fastify" },
            { label: "Prisma", slug: "plugins/prisma" },
            { label: "Redis", slug: "plugins/redis" },
            { label: "Axios", slug: "plugins/axios" },
            { label: "BullMQ", slug: "plugins/bullmq" },
            { label: "Mongoose", slug: "plugins/mongoose" },
            { label: "Sequelize", slug: "plugins/sequelize" },
            { label: "TypeORM", slug: "plugins/typeorm" },
            { label: "pg (node-postgres)", slug: "plugins/pg" },
          ],
        },
        {
          label: "API Reference",
          items: [{ autogenerate: { directory: "reference" } }],
        },
        {
          label: "Guides",
          items: [
            {
              label: "Distributed tracing",
              slug: "guides/distributed-tracing",
            },
            {
              label: "Production checklist",
              slug: "guides/production-checklist",
            },
            { label: "Using the Collector", slug: "guides/collector" },
            { label: "Sysko vs OpenTelemetry", slug: "guides/vs-otel" },
          ],
        },
      ],
      customCss: ["./src/styles/custom.css"],
      head: [
        {
          tag: "link",
          attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
        },
        {
          tag: "link",
          attrs: {
            rel: "preconnect",
            href: "https://fonts.gstatic.com",
            crossorigin: "",
          },
        },
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
          },
        },
      ],
    }),
  ],
});
