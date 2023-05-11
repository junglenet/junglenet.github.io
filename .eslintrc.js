module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends:
    ["prettier", "eslint:recommended", "plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
