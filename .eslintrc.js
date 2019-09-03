module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    jsx: true,
    sourceType: 'module',
    useJSXTextNode: true,
  },
  plugins: ['prettier', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': [
      'error',
      {
        printWidth: 120,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
      }
    ],
    '@typescript-eslint/indent': [
      'error',
      2,
    ],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
