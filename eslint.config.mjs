import globals from 'globals';
import js from '@eslint/js';
import airbnbBase from 'eslint-config-airbnb-base';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    ignores: ['node_modules/', 'dist/']
  },
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    },
    plugins: {
      import: importPlugin
    },
    rules: {
      ...js.configs.recommended.rules,
      ...airbnbBase.rules,
      'no-console': 'off',
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-trailing-spaces': ['error'],
      'prefer-const': ['error'],
      'no-var': ['error']
    }
  }
];
