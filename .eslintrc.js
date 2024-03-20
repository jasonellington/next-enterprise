module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['jsx-a11y', '@typescript-eslint', 'simple-import-sort', 'unused-imports'],
  rules: {
    'react/no-unescaped-entities': 'off',
    //#region  //*=========== Unused Import ===========
    'unused-imports/no-unused-imports': 'error',
    // eslint-ts-unused-imports
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    //#region  //*=========== Import Sort ===========
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': [
      'warn',
      {
        groups: [
          ['^react?\\w', '^@?\\w', '^\\u0000'],
          // packages
          ['^.+\\.s?css$'],
          // {s}css files
          ['^db?\\w', '^integrations?\\w', '^utils?\\w', '^\\u0000'],
          // packages
          ['^src/components', '^src/container'],
          // components
          ['^src/mutations'],
          // mutations
          ['^src/queries'],
          // queries
          ['^src/'],
          // relative paths up until 3 level
          [
            '^\\./?$',
            '^\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\.(?!/?$)',
            '^\\.\\./\\.\\./\\.\\./?$',
            '^\\.\\./\\.\\./\\.\\.(?!/?$)',
          ],
          ['^src/types'],
          // other that didn't fit in
          ['^'],
        ],
      },
    ],
  },
}