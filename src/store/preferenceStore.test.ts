import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'react-native-localize';
import { waitFor } from '@testing-library/react-native';
import i18n from '../app/i18n';
import { usePreferenceStore } from './preferenceStore';

const mockedGetLocales = getLocales as jest.Mock;

describe('preferenceStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetLocales.mockReturnValue([
      { languageCode: 'pt', languageTag: 'pt-BR' },
    ]);
    usePreferenceStore.setState({
      themeMode: 'system',
      language: 'pt-BR',
    });
  });

  it('changes and persists theme mode', async () => {
    usePreferenceStore.getState().setThemeMode('dark');

    expect(usePreferenceStore.getState().themeMode).toBe('dark');

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'preferences',
        expect.stringContaining('"themeMode":"dark"'),
      );
    });
  });

  it('changes i18n language and persists the preference', async () => {
    const changeLanguage = jest.spyOn(i18n, 'changeLanguage');

    usePreferenceStore.getState().setLanguage('en-US');

    expect(changeLanguage).toHaveBeenCalledWith('en-US');
    expect(usePreferenceStore.getState().language).toBe('en-US');

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'preferences',
        expect.stringContaining('"language":"en-US"'),
      );
    });
  });

  it('hydrates current language into i18n', () => {
    const changeLanguage = jest.spyOn(i18n, 'changeLanguage');

    usePreferenceStore.setState({ language: 'pt-BR' });
    usePreferenceStore.getState().hydrateLocale();

    expect(changeLanguage).toHaveBeenCalledWith('pt-BR');
  });
});

describe('preferenceStore device language defaults', () => {
  afterEach(() => {
    jest.resetModules();
  });

  it('uses pt-BR for Portuguese devices', () => {
    jest.doMock('react-native-localize', () => ({
      getLocales: jest.fn(() => [{ languageCode: 'pt', languageTag: 'pt-PT' }]),
    }));

    const { usePreferenceStore: isolatedStore } = require('./preferenceStore');

    expect(isolatedStore.getState().language).toBe('pt-BR');
  });

  it('uses en-US for non-Portuguese devices', () => {
    jest.doMock('react-native-localize', () => ({
      getLocales: jest.fn(() => [{ languageCode: 'es', languageTag: 'es-ES' }]),
    }));

    const { usePreferenceStore: isolatedStore } = require('./preferenceStore');

    expect(isolatedStore.getState().language).toBe('en-US');
  });
});
