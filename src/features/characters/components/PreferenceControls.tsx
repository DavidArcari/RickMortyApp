import React from 'react';
import styled from 'styled-components/native';
import {Chip} from '../../../shared/components/Chip';
import {
  Language,
  ThemeMode,
  usePreferenceStore,
} from '../../../store/preferenceStore';

const themeOptions: ThemeMode[] = ['system', 'light', 'dark'];
const languageOptions: Language[] = ['pt-BR', 'en-US'];

export function PreferenceControls() {
  const themeMode = usePreferenceStore(state => state.themeMode);
  const language = usePreferenceStore(state => state.language);
  const setThemeMode = usePreferenceStore(state => state.setThemeMode);
  const setLanguage = usePreferenceStore(state => state.setLanguage);

  return (
    <Container horizontal showsHorizontalScrollIndicator={false}>
      {themeOptions.map(option => (
        <Chip
          key={option}
          label={option}
          selected={themeMode === option}
          onPress={() => setThemeMode(option)}
        />
      ))}
      {languageOptions.map(option => (
        <Chip
          key={option}
          label={option}
          selected={language === option}
          onPress={() => setLanguage(option)}
        />
      ))}
    </Container>
  );
}

const Container = styled.ScrollView.attrs(({theme}) => ({
  contentContainerStyle: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
}))``;
