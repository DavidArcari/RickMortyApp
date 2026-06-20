import React from 'react';
import { useQuery } from '@apollo/client/react';
import { fireEvent, screen } from '@testing-library/react-native';
import { CharacterDetailsScreen } from './CharacterDetailsScreen';
import { CHARACTER_QUERY } from '../api/queries';
import { makeCharacterDetails, makeEpisode } from '../../../test/factories';
import { renderWithProviders } from '../../../test/render';
import { useFavoriteStore } from '../../../store/favoriteStore';

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as unknown as jest.Mock;

const route = {
  params: {
    characterId: '1',
  },
};

function renderScreen() {
  return renderWithProviders(
    <CharacterDetailsScreen navigation={{} as never} route={route as never} />,
  );
}

function mockCharacterQuery(overrides = {}) {
  const result = {
    data: {
      character: makeCharacterDetails({
        episode: [
          makeEpisode({ id: '1', name: 'Pilot', episode: 'S01E01' }),
          makeEpisode({ id: '2', name: 'Lawnmower Dog', episode: 'S01E02' }),
        ],
      }),
    },
    loading: false,
    error: undefined,
    refetch: jest.fn(() => Promise.resolve()),
    ...overrides,
  };

  useQueryMock.mockReturnValue(result);

  return result;
}

describe('CharacterDetailsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useFavoriteStore.setState({ favoriteIds: [] });
  });

  it('queries the character by route id', () => {
    mockCharacterQuery();

    renderScreen();

    expect(useQueryMock).toHaveBeenCalledWith(CHARACTER_QUERY, {
      variables: { id: '1' },
    });
  });

  it('renders loading state', () => {
    mockCharacterQuery({
      data: undefined,
      loading: true,
    });

    renderScreen();

    expect(screen.getByText('Carregando...')).toBeOnTheScreen();
  });

  it('renders character information and episodes', () => {
    mockCharacterQuery();

    renderScreen();

    expect(screen.getByText('Rick Sanchez')).toBeOnTheScreen();
    expect(screen.getByText('Earth (C-137)')).toBeOnTheScreen();
    expect(screen.getByText('Citadel of Ricks')).toBeOnTheScreen();
    expect(screen.getByText('Pilot')).toBeOnTheScreen();
    expect(screen.getByText('Lawnmower Dog')).toBeOnTheScreen();
  });

  it('renders error state with retry', () => {
    const refetch = jest.fn(() => Promise.resolve());

    mockCharacterQuery({
      data: undefined,
      error: new Error('Network error'),
      refetch,
    });

    renderScreen();

    expect(
      screen.getByText('Nao foi possivel carregar o personagem'),
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button'));

    expect(refetch).toHaveBeenCalledTimes(1);
  });

  it('toggles favorite from details', () => {
    mockCharacterQuery();

    renderScreen();

    fireEvent.press(screen.getByLabelText('Favoritar'));

    expect(useFavoriteStore.getState().isFavorite('1')).toBe(true);
    expect(screen.getByLabelText('Remover favorito')).toBeOnTheScreen();
  });
});
