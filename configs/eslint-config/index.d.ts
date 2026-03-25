import type { Linter } from 'eslint';

declare const config: Linter.Config[];
export default config;

export const baseRules: Linter.RulesRecord;
export const baseOverrides: Linter.ConfigOverride[];
