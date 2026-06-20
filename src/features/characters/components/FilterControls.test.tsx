import React from 'react';
import { fireEvent, screen } from '@testing-library/react-native';
import { FilterControls } from './FilterControls';
import { renderWithProviders } from '../../../test/render';
import type { CharacterFilters } from '../types';

describe('FilterControls', () => {
  it('renders translated filter sections', () => {
    renderWithProviders(<FilterControls filters={{}} onChange={jest.fn()} />);

    expect(screen.getByText('Status')).toBeOnTheScreen();
    expect(screen.getByText('Genero')).toBeOnTheScreen();
    expect(screen.getByLabelText('Especie')).toBeOnTheScreen();
  });

  it('updates status, gender and species filters', () => {
    const onChange = jest.fn();
    const filters: CharacterFilters = {};

    renderWithProviders(
      <FilterControls filters={filters} onChange={onChange} />,
    );

    fireEvent.press(screen.getByText('Vivo'));
    expect(onChange).toHaveBeenCalledWith({ status: 'Alive' });

    fireEvent.press(screen.getByText('Feminino'));
    expect(onChange).toHaveBeenCalledWith({ gender: 'Female' });

    fireEvent.changeText(screen.getByLabelText('Especie'), 'Human');
    expect(onChange).toHaveBeenCalledWith({ species: 'Human' });
  });

  it('marks selected values', () => {
    renderWithProviders(
      <FilterControls
        filters={{ status: 'Dead', gender: 'Genderless' }}
        onChange={jest.fn()}
      />,
    );

    const selectedButtons = screen
      .getAllByRole('button')
      .filter(button => button.props.accessibilityState?.selected);

    expect(selectedButtons).toHaveLength(2);
  });
});
