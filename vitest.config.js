import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'node_modules/',
        'tests/',
        'test-files/',
        '**/*.config.js',
        '**/dist/**',
        '**/build/**',
      ],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
    environment: 'node',
    exclude: ['node_modules', 'dist', 'build'],
    globals: true,
    include: ['tests/**/*.test.js'],
    hookTimeout: 180000, // 3 minutes for consumer-simulation npm install + cleanup
    testTimeout: 60000, // 60s for ESLint cold-start under parallel load
  },
});
