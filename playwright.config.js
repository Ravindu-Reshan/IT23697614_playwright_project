const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 60000, // 60 seconds timeout
  retries: 1,
  workers: 1, // Run tests sequentially
  
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never' 
    }],
    ['json', { 
      outputFile: 'test-results/results.json' 
    }],
    ['list']
  ],

  use: {
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome',
        launchOptions: {
          slowMo: 1000, // 1 second delay between actions
        }
      },
    },
   /* {
      name: 'msedge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge',
        launchOptions: {
          slowMo: 1000,
        }
      },
    },
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        launchOptions: {
          slowMo: 1000,
        }
      },
    },*/
  ],
});