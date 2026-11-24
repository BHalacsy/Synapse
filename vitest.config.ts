import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["tests/**/*.test.ts"],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      "@synapse/protocol": path.resolve(import.meta.dirname, "packages/protocol/src/index.ts"),
    },
  },
});
