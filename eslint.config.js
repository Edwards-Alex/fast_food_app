// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const tseslint = require('@typescript-eslint/eslint-plugin');
const tsparser = require('@typescript-eslint/parser');

module.exports = defineConfig([
  //  继承 Expo 官方推荐规则
  expoConfig,

  //  自定义扩展
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser, // 用 TS parser
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // TypeScript 推荐规则
      ...tseslint.configs.recommended.rules,

      // 额外优化
      'react/react-in-jsx-scope': 'off', // RN 不需要 import React
      'react-native/no-inline-styles': 'off', // 有时必须 inline style
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' }, // 忽略下划线开头的参数
      ],
    },
  },

  // 忽略打包目录
  {
    ignores: ['dist/*'],
  },
]);
