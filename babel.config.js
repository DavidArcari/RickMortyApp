module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        allowlist: ['SENTRY_DSN'],
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
