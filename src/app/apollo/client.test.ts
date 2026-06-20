import { apolloClient } from './client';
import { CHARACTERS_QUERY } from '../../features/characters/api/queries';
import { makeCharacter } from '../../test/factories';

describe('apolloClient', () => {
  beforeEach(() => {
    apolloClient.cache.reset();
  });

  it('merges character pages for the same filter', () => {
    apolloClient.cache.writeQuery({
      query: CHARACTERS_QUERY,
      variables: { page: 1, filter: { name: 'rick' } },
      data: {
        characters: {
          info: { count: 2, pages: 2, next: 2, prev: null },
          results: [makeCharacter({ id: '1', name: 'Rick Sanchez' })],
        },
      },
    });

    apolloClient.cache.writeQuery({
      query: CHARACTERS_QUERY,
      variables: { page: 2, filter: { name: 'rick' } },
      data: {
        characters: {
          info: { count: 2, pages: 2, next: null, prev: 1 },
          results: [makeCharacter({ id: '2', name: 'Tiny Rick' })],
        },
      },
    });

    const data = apolloClient.cache.readQuery({
      query: CHARACTERS_QUERY,
      variables: { page: 1, filter: { name: 'rick' } },
    });

    expect(data?.characters?.results.map(character => character.id)).toEqual([
      '1',
      '2',
    ]);
  });

  it('replaces character results when page is reset to one', () => {
    apolloClient.cache.writeQuery({
      query: CHARACTERS_QUERY,
      variables: { page: 2, filter: { name: 'rick' } },
      data: {
        characters: {
          info: { count: 1, pages: 1, next: null, prev: null },
          results: [makeCharacter({ id: '1' })],
        },
      },
    });

    apolloClient.cache.writeQuery({
      query: CHARACTERS_QUERY,
      variables: { page: 1, filter: { name: 'morty' } },
      data: {
        characters: {
          info: { count: 1, pages: 1, next: null, prev: null },
          results: [makeCharacter({ id: '2', name: 'Morty Smith' })],
        },
      },
    });

    const data = apolloClient.cache.readQuery({
      query: CHARACTERS_QUERY,
      variables: { page: 1, filter: { name: 'morty' } },
    });

    expect(data?.characters?.results).toHaveLength(1);
    expect(data?.characters?.results[0].name).toBe('Morty Smith');
  });
});
