import os from 'os'
import path from 'path'
import { defineConfig } from '@playwright/test'

const PORT = process.env.PORT || '3000'

const tmpDir = path.join(os.tmpdir(), 'react-router-template')

export default defineConfig({
  timeout: 10000 * (process.env.CI ? 10 : 1),
  expect: {
    timeout: 5000 * (process.env.CI ? 10 : 1),
  },
  outputDir: path.join(tmpDir, 'playwright-test-output'),
  reporter: [
    [
      'html',
      { open: 'never', outputFolder: path.join(tmpDir, 'playwright-report') },
    ],
  ],
  use: {
    baseURL: `http://localhost:${PORT}/`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
  ],
  webServer: {
    command: 'pnpm dev',
    port: Number(PORT),
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
    env: { PORT },
  },
})
