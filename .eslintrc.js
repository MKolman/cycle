module.exports = {
  root: true,

  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript',
    'vuetify',
    '@vue/typescript/recommended',
  ],

  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
  },

  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
      ],
      env: {
        jest: true,
      },
    },
  ],
}
