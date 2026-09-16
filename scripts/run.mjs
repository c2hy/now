import { spawnSync } from 'node:child_process';
const action = process.argv[2];
const preview = action === 'dev' || action === 'build:preview';
const command = action === 'build:preview' ? 'build' : action;
const result = spawnSync(
  process.execPath,
  ['./node_modules/astro/bin/astro.mjs', command, ...process.argv.slice(3)],
  {
    stdio: 'inherit',
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: '1',
      PREVIEW_CONTENT: preview ? 'true' : 'false',
    },
  },
);
process.exit(result.status ?? 1);
