module.exports = {
  settings: {
    'import/resolver': {
      'node': {
        'paths': ['./', './app']
      }
    },
  },
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
  rules: {
    'consistent-return': 0,
    'no-param-reassign': 0,
    'prefer-promise-reject-errors': 0,
  },
};
