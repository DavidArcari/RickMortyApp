import type { CharacterFilters } from '../types';

export function cleanFilters(filters: CharacterFilters): CharacterFilters {
  return Object.entries(filters).reduce<CharacterFilters>(
    (acc, [key, value]) => {
      if (typeof value === 'string' && value.trim().length > 0) {
        return { ...acc, [key]: value.trim() };
      }

      return acc;
    },
    {},
  );
}

export function hasActiveFilters(filters: CharacterFilters) {
  return Object.keys(cleanFilters(filters)).length > 0;
}
