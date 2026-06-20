import i18n from 'i18next';
import { getLocales } from 'react-native-localize';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './storage';

export type ThemeMode = 'system' | 'light' | 'dark';
export type Language = 'pt-BR' | 'en-US';

type PreferenceState = {
  themeMode: ThemeMode;
  language: Language;
  setThemeMode: (themeMode: ThemeMode) => void;
  setLanguage: (language: Language) => void;
  hydrateLocale: () => void;
};

const supportedLanguages: Language[] = ['pt-BR', 'en-US'];

function getDeviceLanguage(): Language {
  const languageTag = getLocales()[0]?.languageTag;

  return supportedLanguages.includes(languageTag as Language)
    ? (languageTag as Language)
    : 'pt-BR';
}

export const usePreferenceStore = create<PreferenceState>()(
  persist(
    (set, get) => ({
      themeMode: 'system',
      language: 'pt-BR',
      setThemeMode: themeMode => set({ themeMode }),
      setLanguage: language => {
        i18n.changeLanguage(language).catch(() => undefined);
        set({ language });
      },
      hydrateLocale: () => {
        const language = get().language ?? getDeviceLanguage();
        i18n.changeLanguage(language).catch(() => undefined);
        set({ language });
      },
    }),
    {
      name: 'preferences',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
