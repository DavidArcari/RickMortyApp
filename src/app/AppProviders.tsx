import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as StyledThemeProvider } from 'styled-components/native';
import { apolloClient } from './apollo/client';
import './i18n';
import { setupSentry } from './sentry/setupSentry';
import { darkTheme, lightTheme } from './theme/theme';
import { usePreferenceStore } from '../store/preferenceStore';

export function AppProviders({ children }: PropsWithChildren) {
  const colorScheme = useColorScheme();
  const themeMode = usePreferenceStore(state => state.themeMode);
  const hydrateLocale = usePreferenceStore(state => state.hydrateLocale);

  useEffect(() => {
    setupSentry();
    hydrateLocale();
  }, [hydrateLocale]);

  const isDark =
    themeMode === 'dark' || (themeMode === 'system' && colorScheme === 'dark');

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  return (
    <ApolloProvider client={apolloClient}>
      <StyledThemeProvider theme={theme}>
        <SafeAreaProvider>
          <StatusBar
            barStyle={isDark ? 'light-content' : 'dark-content'}
            backgroundColor={theme.colors.background}
          />
          {children}
        </SafeAreaProvider>
      </StyledThemeProvider>
    </ApolloProvider>
  );
}
