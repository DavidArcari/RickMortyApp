import AsyncStorage from '@react-native-async-storage/async-storage';
import { waitFor } from '@testing-library/react-native';
import { useFavoriteStore } from './favoriteStore';

describe('favoriteStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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

  it('keeps multiple favorites', () => {
    useFavoriteStore.getState().toggleFavorite('1');
    useFavoriteStore.getState().toggleFavorite('2');

    expect(useFavoriteStore.getState().favoriteIds).toEqual(['1', '2']);
  });

  it('persists favorites changes', async () => {
    useFavoriteStore.getState().toggleFavorite('1');

    await waitFor(() => {
      expect(AsyncStorage.setItem).toHaveBeenCalledWith(
        'favorites',
        expect.stringContaining('"favoriteIds":["1"]'),
      );
    });
  });
});
