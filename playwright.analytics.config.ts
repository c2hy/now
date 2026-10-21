import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'analytics.spec.ts',
  timeout: 60_000,
  use: { baseURL: 'http://127.0.0.1:14322' },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
  webServer: {
    command: 'node scripts/analytics-test-server.mjs',
    url: 'http://127.0.0.1:14322',
    timeout: 120_000,
    reuseExistingServer: false,
  },
});
