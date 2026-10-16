import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  workers: 2,
  use: {
    baseURL: "http://127.0.0.1:4321",
    launchOptions: {
      executablePath:
        process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
      args: ["--no-sandbox"],
    },
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { viewport: { width: 375, height: 812 } } },
    { name: "small-mobile", use: { viewport: { width: 320, height: 740 } } },
  ],
  webServer: {
    command: "npm run preview -- --port 4321 --ignore-lock",
    url: "http://127.0.0.1:4321",
    reuseExistingServer: false,
  },
});
