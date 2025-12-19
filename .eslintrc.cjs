module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  env: {
    es6: true,
  },
  ignorePatterns: ['Code.js'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
