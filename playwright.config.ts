import { defineConfig, devices } from "@playwright/test";

const externalServer = process.env.PLAYWRIGHT_BASE_URL;
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: [["list"]],
  use: {
    ...devices["Desktop Chrome"],
    baseURL: externalServer ?? "http://127.0.0.1:3100",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: externalServer
    ? undefined
    : {
        command: "npm run start -- --hostname 127.0.0.1 --port 3100",
        url: "http://127.0.0.1:3100/docs",
        reuseExistingServer: !process.env.CI,
        timeout: 60_000,
      },
});
