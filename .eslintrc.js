module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier'],
  plugins: ['react', 'prettier'],
  env: {
    browser: true,
  },
  rules: {
    'prettier/prettier': 2,
    'import/no-unresolved': 0,
    'linebreak-style': 2,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/prop-types': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    quotes: [
      2,
      'single',
      {
        allowTemplateLiterals: true,
        avoidEscape: true,
      },
    ],
    'no-console': 0,
    'no-shadow': 0,
    'no-param-reassign': [2, { props: false }],
    'max-classes-per-file': 0,
    'class-methods-use-this': 0,
    'no-prototype-builtins': 0,
    'no-underscore-dangle': 0,
    'prefer-destructuring': 0,
    'no-undef': 0,
    'padding-line-between-statements': [
      2,
      { blankLine: 'always', prev: '*', next: ['return', 'if', 'for', 'export', 'class', 'try', 'throw'] },
      { blankLine: 'any', prev: 'export', next: 'export' },
      { blankLine: 'any', prev: '*', next: ['return', 'throw'] },
    ],
    'import/no-extraneous-dependencies': [0, { devDependencies: ['customize-cra'] }],
  },
};
