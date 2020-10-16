module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'airbnb/hooks',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/react',
    'prettier/standard',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    'import',
    'jsx-a11y',
    'prettier',
    'prefer-arrow',
    'react',
    'react-hooks'
  ],
  root: true,
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'jsx-a11y/anchor-is-valid': 0,
    'react/react-in-jsx-scope': 0,
    "react/prop-types": 0,
    '@typescript-eslint/require-await': 0,
    'react/require-default-props': [
      'error', {
        ignoreFunctionalComponents: true
      }
    ],
    'import/no-extraneous-dependencies': [
      'error', {
        devDependencies: ['**/*.test.*', '**/setupTests.*'],
        optionalDependencies: false,
      }
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
};
