module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['unused-imports'],
  rules: {
    'react-native/no-inline-styles': 0,
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': [
      'error',
      {
        'no-inline-styles': false,
      },
    ],
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
  },
};
