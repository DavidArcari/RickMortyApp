import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { StateView } from './StateView';
import { renderWithProviders } from '../../test/render';

describe('StateView', () => {
  it('renders title, description and action', () => {
    const onAction = jest.fn();

    renderWithProviders(
      <StateView
        title="Could not load"
        description="Network error"
        actionLabel="Try again"
        onAction={onAction}
      />,
    );

    expect(screen.getByText('Could not load')).toBeOnTheScreen();
    expect(screen.getByText('Network error')).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button'));

    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('omits optional description and action', () => {
    renderWithProviders(<StateView title="Empty" />);

    expect(screen.getByText('Empty')).toBeOnTheScreen();
    expect(screen.queryByRole('button')).toBeNull();
  });

  it('renders loading state', () => {
    renderWithProviders(<StateView loading title="Loading..." />);

    expect(screen.getByText('Loading...')).toBeOnTheScreen();
  });
});
