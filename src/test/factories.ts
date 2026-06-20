import type {
  CharacterDetails,
  CharacterSummary,
  Episode,
} from '../features/characters/types';

export function makeCharacter(
  overrides: Partial<CharacterSummary> = {},
): CharacterSummary {
  return {
    id: '1',
    name: 'Rick Sanchez',
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
      name: 'Earth (C-137)',
    },
    location: {
      name: 'Citadel of Ricks',
    },
    ...overrides,
  };
}

export function makeEpisode(overrides: Partial<Episode> = {}): Episode {
  return {
    id: '1',
    name: 'Pilot',
    episode: 'S01E01',
    air_date: 'December 2, 2013',
    ...overrides,
  };
}

export function makeCharacterDetails(
  overrides: Partial<CharacterDetails> = {},
): CharacterDetails {
  return {
    ...makeCharacter(),
    type: '',
    episode: [makeEpisode()],
    ...overrides,
  };
}
