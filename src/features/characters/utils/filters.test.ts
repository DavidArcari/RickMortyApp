import { cleanFilters, hasActiveFilters } from './filters';

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
    expect(hasActiveFilters({ species: ' ' })).toBe(false);
    expect(hasActiveFilters({ gender: 'Female' })).toBe(true);
  });

  it('keeps all supported meaningful filters', () => {
    expect(
      cleanFilters({
        name: ' Rick ',
        species: ' Human ',
        status: 'Dead',
        gender: 'Genderless',
      }),
    ).toEqual({
      name: 'Rick',
      species: 'Human',
      status: 'Dead',
      gender: 'Genderless',
    });
  });

  it('removes undefined filters', () => {
    expect(
      cleanFilters({
        name: undefined,
        species: undefined,
        status: undefined,
        gender: undefined,
      }),
    ).toEqual({});
  });
});
