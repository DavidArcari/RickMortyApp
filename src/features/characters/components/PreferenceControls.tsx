import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/native';
import { Chip } from '../../../shared/components/Chip';
import {
  Language,
  ThemeMode,
  usePreferenceStore,
} from '../../../store/preferenceStore';

const themeOptions: ThemeMode[] = ['system', 'light', 'dark'];
const languageOptions: Language[] = ['pt-BR', 'en-US'];

export function PreferenceControls() {
  const { t } = useTranslation();
  const themeMode = usePreferenceStore(state => state.themeMode);
  const language = usePreferenceStore(state => state.language);
  const setThemeMode = usePreferenceStore(state => state.setThemeMode);
  const setLanguage = usePreferenceStore(state => state.setLanguage);

  return (
    <Container>
      <ControlsRow>
        <SectionLabel>{t('preferences.themeLabel')}</SectionLabel>
        {themeOptions.map(option => (
          <Chip
            key={option}
            label={t(`preferences.theme.${option}`)}
            selected={themeMode === option}
            onPress={() => setThemeMode(option)}
          />
        ))}
      </ControlsRow>
      <ControlsRow>
        <SectionLabel>{t('preferences.languageLabel')}</SectionLabel>
        {languageOptions.map(option => (
          <Chip
            key={option}
            label={option}
            selected={language === option}
            onPress={() => setLanguage(option)}
          />
        ))}
      </ControlsRow>
    </Container>
  );
}

const Container = styled.View`
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const ControlsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm}px;
  padding-right: ${({ theme }) => theme.spacing.md}px;
`;

const SectionLabel = styled.Text`
  align-self: center;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 700;
`;
