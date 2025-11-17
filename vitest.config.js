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
  },
});
