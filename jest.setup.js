/* eslint-env jest */

jest.mock('@react-native-async-storage/async-storage', () => {
  const storage = new Map();

  return {
    getItem: jest.fn(key => Promise.resolve(storage.get(key) ?? null)),
    setItem: jest.fn((key, value) => {
      storage.set(key, String(value));
      return Promise.resolve();
    }),
    removeItem: jest.fn(key => {
      storage.delete(key);
      return Promise.resolve();
    }),
    clear: jest.fn(() => {
      storage.clear();
      return Promise.resolve();
    }),
  };
});

jest.mock('react-native-localize', () => ({
  getLocales: jest.fn(() => [{ languageCode: 'pt', languageTag: 'pt-BR' }]),
}));

jest.mock(
  '@env',
  () => ({
    SENTRY_DSN: undefined,
  }),
  { virtual: true },
);

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  reactNavigationIntegration: jest.fn(() => ({
    registerNavigationContainer: jest.fn(),
  })),
}));
