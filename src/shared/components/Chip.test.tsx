import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { Chip } from './Chip';
import { renderWithProviders } from '../../test/render';

describe('Chip', () => {
  it('renders selected state', () => {
    renderWithProviders(<Chip label="Alive" selected onPress={jest.fn()} />);

    expect(screen.getByRole('button').props.accessibilityState).toEqual(
      expect.objectContaining({
        selected: true,
      }),
    );
    expect(screen.getByText('Alive')).toBeOnTheScreen();
  });

  it('calls onPress when enabled', () => {
    const onPress = jest.fn();

    renderWithProviders(<Chip label="Filter" onPress={onPress} />);

    fireEvent.press(screen.getByRole('button'));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('renders as disabled content without onPress', () => {
    renderWithProviders(<Chip label="Static" />);

    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.getByText('Static')).toBeOnTheScreen();
  });
});
