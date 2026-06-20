describe('setupSentry', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('does not initialize without DSN', () => {
    const init = jest.fn();

    jest.doMock('@sentry/react-native', () => ({
      init,
      reactNavigationIntegration: jest.fn(() => ({
        registerNavigationContainer: jest.fn(),
      })),
    }));
    jest.doMock('../config/env', () => ({
      env: { sentryDsn: '' },
    }));

    const { setupSentry } = require('./setupSentry');

    setupSentry();

    expect(init).not.toHaveBeenCalled();
  });

  it('initializes once with React Navigation integration when DSN exists', () => {
    const init = jest.fn();
    const integration = {
      registerNavigationContainer: jest.fn(),
    };

    jest.doMock('@sentry/react-native', () => ({
      init,
      reactNavigationIntegration: jest.fn(() => integration),
    }));
    jest.doMock('../config/env', () => ({
      env: { sentryDsn: 'https://public@example.com/1' },
    }));

    const { routingInstrumentation, setupSentry } = require('./setupSentry');

    setupSentry();
    setupSentry();

    expect(routingInstrumentation).toBe(integration);
    expect(init).toHaveBeenCalledTimes(1);
    expect(init).toHaveBeenCalledWith({
      dsn: 'https://public@example.com/1',
      tracesSampleRate: 0.2,
      integrations: [integration],
    });
  });
});
