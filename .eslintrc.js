module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    'airbnb',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    "linebreak-style": 0,
    "import/prefer-default-export": "off",
    'no-plusplus': 'off',
    'comma-dangle': ['error', 'never'],
    "global-require": 0,
    "no-param-reassign": [2, {"props": false}],
    'no-undef' : 'off',
  },
};
