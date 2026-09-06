import globals from "globals";
import pluginJs from "@eslint/js";
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  {languageOptions: {
    globals: globals.browser,
    ecmaVersion: 2026,
    sourceType: "module" }
  },
  pluginJs.configs.recommended,
  {
    files: ['**/*.js'],
    plugins: {
      jsdoc,
    },
    rules: {
      'jsdoc/require-description': 'warn'
    }
  },
  jsdoc.configs['flat/recommended'],
];
