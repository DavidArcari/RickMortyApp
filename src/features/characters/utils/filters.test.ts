import {cleanFilters, hasActiveFilters} from './filters';

describe('character filters', () => {
  it('removes empty string values and trims meaningful values', () => {
    expect(
      cleanFilters({
        name: '  morty ',
        species: '   ',
        status: 'Alive',
      }),
    ).toEqual({
      name: 'morty',
      status: 'Alive',
    });
  });

  it('detects active filters after cleaning', () => {
    expect(hasActiveFilters({species: ' '})).toBe(false);
    expect(hasActiveFilters({gender: 'Female'})).toBe(true);
  });
});
