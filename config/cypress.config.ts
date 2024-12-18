// config/cypress.config.ts
import { defineConfig } from 'cypress';
import viteConfig from '../vite.config.ts';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: '../tests/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: '../tests/e2e/support/index.ts',
    videosFolder: '../tests/e2e/videos',
    screenshotsFolder: '../tests/e2e/screenshots'
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite',
      viteConfig
    },
    specPattern: '../src/**/__tests__/*.cy.{js,jsx,ts,tsx}'
  }
});
