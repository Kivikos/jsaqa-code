// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    headless: false,
    viewport: { width: 1920, height: 1080 },
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
    launchOptions: {
      slowMo: 5000,
      timeout: 60000,
      devtools: true,
    },
  },
  expect: { timeout: 30000 },
};

module.exports = config;
