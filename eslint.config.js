import globals from 'globals';
import pluginJs from '@eslint/js';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  {
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2026,
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  jsdoc.configs['flat/recommended'],
  {
    files: ['src/assets/js/**/*.js'],
    rules: {
      'jsdoc/require-description': 'warn',
    },
  },
];
