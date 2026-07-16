import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Pin the workspace root to THIS directory. Without this, Turbopack walks up and
// picks ~/package-lock.json (the home-dir git repo) as the root, which breaks
// deploys. See the Jul 13 system audit re: the home-dir shadow repo.
const nextConfig: NextConfig = {
  turbopack: {
    root: dirname(fileURLToPath(import.meta.url)),
  },
};

export default nextConfig;
