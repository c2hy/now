import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// Exercise the production bundle with a fake key and intercepted endpoint.
// Keep the deployment build in dist untouched, including its real public key.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
process.env.PREVIEW_CONTENT = 'false';
process.env.PUBLIC_DRIP_ENABLED = 'true';
process.env.PUBLIC_DRIP_WRITE_KEY = 'pk_browser_test';
process.env.PUBLIC_DRIP_ENDPOINT = 'https://collector.invalid/v1/events';
process.env.PUBLIC_DRIP_ALLOWED_ORIGINS = 'http://127.0.0.1:14322';
process.env.VERCEL_ENV = 'production';
const directory = await mkdtemp(join(tmpdir(), 'now-drip-test-'));
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
