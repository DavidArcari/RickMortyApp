import { useFavoriteStore } from './favoriteStore';

describe('favoriteStore', () => {
  beforeEach(() => {
    useFavoriteStore.setState({ favoriteIds: [] });
  });

  it('toggles a character as favorite', () => {
    useFavoriteStore.getState().toggleFavorite('1');

    expect(useFavoriteStore.getState().favoriteIds).toEqual(['1']);
    expect(useFavoriteStore.getState().isFavorite('1')).toBe(true);
  });

  it('removes an existing favorite when toggled again', () => {
    useFavoriteStore.getState().toggleFavorite('1');
    useFavoriteStore.getState().toggleFavorite('1');

    expect(useFavoriteStore.getState().favoriteIds).toEqual([]);
    expect(useFavoriteStore.getState().isFavorite('1')).toBe(false);
  });
});
