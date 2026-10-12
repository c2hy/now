// Keep the test server attached to Playwright, including in agent environments
// where the Astro CLI otherwise starts a background process and exits early.
process.env.ASTRO_TELEMETRY_DISABLED = '1';
process.env.PREVIEW_CONTENT = 'true';
const { dev } = await import('astro');
await dev({ server: { host: '127.0.0.1', port: 4321 } });
