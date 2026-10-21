import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Exercise the production bundle with a fake token and intercepted requests.
// Keep the deployment build in dist untouched.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
process.env.PREVIEW_CONTENT = 'false';
process.env.PUBLIC_MIXPANEL_ENABLED = 'true';
process.env.PUBLIC_MIXPANEL_TOKEN = 'test_token';
const directory = await mkdtemp(join(tmpdir(), 'now-analytics-test-'));
const outDir = directory;
const { build, preview } = await import('astro');
await build({ outDir });
const server = await preview({
  outDir,
  server: { host: '127.0.0.1', port: 14322 },
});
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.once(signal, async () => {
    await server.stop();
    await rm(directory, { recursive: true, force: true });
    process.exit(0);
  });
}
