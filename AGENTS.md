# Project rules

The project is a distributed agentic loop/graph runner using Pi durable for persistent agent runs.

See [README.md](./README.md) for full project context, architecture, tech stack, and directory structure.

## Rules

- Do not make test unless specifically asked to
- Only add package unless specifically asked to -> ask if you need to
- Do not read .env ever
- If any files or directories are added, removed, or moved, the project structure tree in `README.md` must be updated to reflect that change.
- Pre-push verification: Before finishing any changes or pushing, always run all checks:
  1. Formatting: `pnpm format`
  2. Linting: `pnpm lint`
  3. Type checking: `pnpm check-types`
  4. Build: `pnpm build`
  5. Tests: `pnpm test`
- Only return verification results if there is an error. When everything passes, do not include verification results in the response.
