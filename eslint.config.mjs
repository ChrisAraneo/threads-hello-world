import createConfigs from '@chris.araneo/eslint-config';

export default [
  ...createConfigs({
    sources: ['src/(?!.*\\.spec\\.ts$).*\\.ts', 'tsup.config.ts'],
    tests: ['src/**/*.spec.ts'],
    jsons: ['*.json', 'src/**/*.json'],
    ignored: [
      'node_modules/',
      'coverage/',
      'package.json',
      'package-lock.json',
      'tsup.config.ts',
      'dist/',
    ],
  }),
];
