import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { PreferenceControls } from './PreferenceControls';
import { renderWithProviders } from '../../../test/render';
import { usePreferenceStore } from '../../../store/preferenceStore';

describe('PreferenceControls', () => {
  beforeEach(() => {
    usePreferenceStore.setState({
      themeMode: 'system',
      language: 'pt-BR',
    });
  });

  it('groups theme and language options', () => {
    renderWithProviders(<PreferenceControls />);

    expect(screen.getByText('Tema')).toBeOnTheScreen();
    expect(screen.getByText('Sistema')).toBeOnTheScreen();
    expect(screen.getByText('Claro')).toBeOnTheScreen();
    expect(screen.getByText('Escuro')).toBeOnTheScreen();
    expect(screen.getByText('Idioma')).toBeOnTheScreen();
    expect(screen.getByText('pt-BR')).toBeOnTheScreen();
    expect(screen.getByText('en-US')).toBeOnTheScreen();
  });

  it('updates theme mode', () => {
    renderWithProviders(<PreferenceControls />);

    fireEvent.press(screen.getByText('Escuro'));

    expect(usePreferenceStore.getState().themeMode).toBe('dark');
  });

  it('updates language', () => {
    renderWithProviders(<PreferenceControls />);

    fireEvent.press(screen.getByText('en-US'));

    expect(usePreferenceStore.getState().language).toBe('en-US');
  });
});
