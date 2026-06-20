import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { CharacterCard } from './CharacterCard';
import { makeCharacter } from '../../../test/factories';
import { renderWithProviders } from '../../../test/render';

describe('CharacterCard', () => {
  it('renders character summary and opens details', () => {
    const onPress = jest.fn();

    renderWithProviders(
      <CharacterCard
        character={makeCharacter()}
        favorite={false}
        onPress={onPress}
        onToggleFavorite={jest.fn()}
      />,
    );

    expect(screen.getByText('Rick Sanchez')).toBeOnTheScreen();
    expect(screen.getByText('Alive - Human')).toBeOnTheScreen();
    expect(screen.getByText('Male')).toBeOnTheScreen();

    fireEvent.press(screen.getByText('Rick Sanchez'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('toggles favorite without opening details', () => {
    const onPress = jest.fn();
    const onToggleFavorite = jest.fn();

    renderWithProviders(
      <CharacterCard
        character={makeCharacter()}
        favorite={false}
        onPress={onPress}
        onToggleFavorite={onToggleFavorite}
      />,
    );

    fireEvent.press(screen.getByLabelText('Favoritar'));

    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onPress).not.toHaveBeenCalled();
  });
});
