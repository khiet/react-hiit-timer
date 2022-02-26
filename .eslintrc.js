module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-default-export': 'error',
    'react/function-component-definition': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'max-len': ['error', { code: 160 }],
  },
};
