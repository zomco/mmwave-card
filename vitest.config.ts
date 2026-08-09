import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // The card's testable core is pure: coordinate transforms, the fallback
    // tracker, frame parsing and the per-model readFromHass adapters. None of
    // it needs a DOM, so the default node environment keeps the suite fast.
    environment: 'node',
    include: ['test/**/*.test.ts'],
  },
});
