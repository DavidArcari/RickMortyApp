import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import {zustandStorage} from './storage';

type FavoriteState = {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isFavorite: id => get().favoriteIds.includes(id),
      toggleFavorite: id => {
        set(state => {
          const exists = state.favoriteIds.includes(id);

          return {
            favoriteIds: exists
              ? state.favoriteIds.filter(favoriteId => favoriteId !== id)
              : [...state.favoriteIds, id],
          };
        });
      },
    }),
    {
      name: 'favorites',
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
