# Synapse

Distributed agentic loop/graph runner using Pi durable for persistent agent runs.

---

## Project Context

### Tech Stack

- **Monorepo & Tooling**: pnpm workspaces, Turborepo, TypeScript, Biome (formatting & linting), Vitest (testing)
- **Backend (`apps/backend`)**:
  - **Server**: Fastify (HTTP & WebSocket routing via `@fastify/websocket`)
  - **Validation & OpenAPI**: `fastify-type-provider-zod`, `@fastify/swagger`, `@fastify/swagger-ui`
  - **Database & ORM**: PostgreSQL (`pg`), Drizzle ORM (`drizzle-orm`), Drizzle Kit (`drizzle-kit`)
  - **Bundler**: `tsup`
- **Protocol (`packages/protocol`)**:
  - Shared schemas and TypeScript types for HTTP REST and WebSocket communications using `zod`
- **Nodes (`apps/node`)**:
  - **Agent Runtime**: `@earendil-works/pi-durable`
  - **Comms**: WebSocket client (`ws`) connecting to backend
  - **Local Persistence**: SQLite (mirrored to backend PostgreSQL)
- **Frontend (`apps/frontend` - planned)**:
  - Mobile, desktop, and TUI communicating via HTTP and WS

### Backend

The middleware between the frontends and the nodes.
Communicates via HTTP and WebSockets. Mirrors node session statuses from node SQLite to local (backend) PostgreSQL.
Decides which nodes initialize a session and run jobs. Receives webhooks (e.g. GitHub issues, Discord/Slack messages) to trigger sessions.
Stores and manages agents, workflows, and general system configuration.

### Nodes

Executes sessions initialized by the backend. Runs Pi durable sessions and chosen workflows/agents.
Starts by opening a worktree for the specified repository and running a workflow end-to-end, typically ending with autoship (test, lint, format -> open PR or notify user on success).

### Protocol

Single shared package for all wire communication contracts (HTTP request/response schemas and WebSocket event unions). Used by backend, nodes, and future frontend.

### Frontend

Client interfaces for user interaction. Planned for mobile, desktop, and TUI. Connects to backend via HTTP and WebSockets.

---

## Project Structure

```
Synapse/
├── apps/
│   ├── backend/                     # Backend API & WebSocket service
│   │   ├── drizzle.config.ts        # Drizzle Kit configuration for migrations & studio
│   │   ├── package.json             # Fastify, Drizzle ORM, WebSocket dependencies & scripts
│   │   ├── tsconfig.json            # Backend TypeScript configuration
│   │   └── src/
│   │       ├── app.ts               # Fastify app builder (routes, plugins, OpenAPI, Swagger)
│   │       ├── index.ts             # Backend HTTP & WebSocket server entrypoint
│   │       └── db/
│   │           ├── index.ts         # Drizzle connection factory (createDb)
│   │           └── schema.ts        # PostgreSQL database schema definitions
│   └── node/                        # Worker node executing Pi durable sessions
│       ├── package.json             # Pi durable, WebSocket client dependencies & scripts
│       ├── tsconfig.json            # Node TypeScript configuration
│       └── src/
│           └── index.ts             # Node daemon entrypoint connecting to backend WS
├── packages/
│   └── protocol/                    # Shared communication schemas & TypeScript types
│       ├── package.json             # Protocol package configuration (Zod)
│       ├── tsconfig.json            # Protocol TypeScript configuration (composite)
│       └── src/
│           └── index.ts             # Shared Zod schemas (HTTP DTOs & WS discriminated union)
├── tests/                           # Integration and end-to-end tests
│   └── .gitkeep                     # Test directory placeholder
├── .env.example                     # Example environment variable configuration
├── .gitignore                       # Git ignore patterns for dependencies, builds, & caches
├── AGENTS.md                        # AI agent guidelines, constraints, and project rules
├── biome.json                       # Biome formatter & linter configuration
├── package.json                     # Monorepo root definition, dev tooling, and scripts
├── pnpm-lock.yaml                   # Pinned dependency lockfile
├── pnpm-workspace.yaml              # Workspace package globs & approved build scripts
├── README.md                        # Project documentation, context & structure
├── tsconfig.base.json               # Shared base TypeScript compiler options
├── tsconfig.json                    # Root TypeScript project references configuration
├── turbo.json                       # Turborepo task pipeline configuration
└── vitest.config.ts                 # Vitest test runner configuration & module aliases
```
