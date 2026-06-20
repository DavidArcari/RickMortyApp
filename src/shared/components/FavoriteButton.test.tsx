import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { FavoriteButton } from './FavoriteButton';
import { renderWithProviders } from '../../test/render';

jest.mock('lucide-react-native', () => {
  const ReactModule = require('react');
  const { Text } = require('react-native');

  return {
    Star: jest.fn((props: Record<string, unknown>) =>
      ReactModule.createElement(Text, { testID: 'star-icon', ...props }),
    ),
  };
});

describe('FavoriteButton', () => {
  it('renders favorite action when inactive', () => {
    const onPress = jest.fn();

    renderWithProviders(<FavoriteButton active={false} onPress={onPress} />);

    fireEvent.press(screen.getByLabelText('Favoritar'));

    expect(onPress).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('star-icon')).toHaveProp('fill', 'transparent');
  });

  it('renders unfavorite action with filled star when active', () => {
    renderWithProviders(<FavoriteButton active onPress={jest.fn()} />);

    expect(screen.getByLabelText('Remover favorito')).toBeOnTheScreen();
    expect(screen.getByTestId('star-icon').props.fill).not.toBe('transparent');
  });
});
