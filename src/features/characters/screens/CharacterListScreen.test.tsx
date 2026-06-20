import React from 'react';
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { act, fireEvent, screen } from '@testing-library/react-native';
import { CharacterListScreen } from './CharacterListScreen';
import { CHARACTERS_QUERY } from '../api/queries';
import { makeCharacter } from '../../../test/factories';
import { renderWithProviders } from '../../../test/render';
import { useFavoriteStore } from '../../../store/favoriteStore';

jest.mock('@apollo/client/react', () => ({
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as unknown as jest.Mock;

const navigation = {
  navigate: jest.fn(),
};

function renderScreen() {
  return renderWithProviders(
    <CharacterListScreen
      navigation={navigation as never}
      route={{} as never}
    />,
  );
}

function mockCharactersQuery(overrides = {}) {
  const result = {
    data: {
      characters: {
        info: { count: 1, pages: 1, next: null, prev: null },
        results: [makeCharacter()],
      },
    },
    error: undefined,
    loading: false,
    networkStatus: NetworkStatus.ready,
    refetch: jest.fn(() => Promise.resolve()),
    fetchMore: jest.fn(() => Promise.resolve()),
    ...overrides,
  };

  useQueryMock.mockReturnValue(result);

  return result;
}

describe('CharacterListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useFavoriteStore.setState({ favoriteIds: [] });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initial loading state', () => {
    mockCharactersQuery({
      data: undefined,
      loading: true,
      networkStatus: NetworkStatus.loading,
    });

    renderScreen();

    expect(screen.getByText('Carregando...')).toBeOnTheScreen();
  });

  it('renders characters and navigates to details', () => {
    mockCharactersQuery();

    renderScreen();

    expect(screen.getByText('Rick Sanchez')).toBeOnTheScreen();

    fireEvent.press(screen.getByText('Rick Sanchez'));

    expect(navigation.navigate).toHaveBeenCalledWith('CharacterDetails', {
      characterId: '1',
    });
  });

  it('renders empty state', () => {
    mockCharactersQuery({
      data: {
        characters: {
          info: { count: 0, pages: 0, next: null, prev: null },
          results: [],
        },
      },
    });

    renderScreen();

    expect(screen.getByText('Nenhum personagem encontrado')).toBeOnTheScreen();
  });

  it('renders error state with retry', () => {
    const refetch = jest.fn(() => Promise.resolve());

    mockCharactersQuery({
      data: undefined,
      error: new Error('Network error'),
      refetch,
    });

    renderScreen();

    expect(
      screen.getByText('Nao foi possivel carregar os personagens'),
    ).toBeOnTheScreen();

    fireEvent.press(screen.getByRole('button'));

    expect(refetch).toHaveBeenCalledWith({ page: 1, filter: {} });
  });

  it('debounces search before querying by name', () => {
    jest.useFakeTimers();
    mockCharactersQuery();

    renderScreen();

    fireEvent.changeText(screen.getByLabelText('Buscar por nome'), 'morty');

    expect(useQueryMock).toHaveBeenLastCalledWith(
      CHARACTERS_QUERY,
      expect.objectContaining({
        variables: { page: 1, filter: {} },
      }),
    );

    act(() => {
      jest.advanceTimersByTime(400);
    });

    expect(useQueryMock).toHaveBeenLastCalledWith(
      CHARACTERS_QUERY,
      expect.objectContaining({
        variables: { page: 1, filter: { name: 'morty' } },
      }),
    );
  });

  it('applies status and species filters', () => {
    mockCharactersQuery();

    renderScreen();

    fireEvent.press(screen.getByText('Filtros'));
    fireEvent.press(screen.getByText('Morto'));
    fireEvent.changeText(screen.getByLabelText('Especie'), 'Alien');

    expect(useQueryMock).toHaveBeenLastCalledWith(
      CHARACTERS_QUERY,
      expect.objectContaining({
        variables: {
          page: 1,
          filter: { status: 'Dead', species: 'Alien' },
        },
      }),
    );
  });

  it('toggles favorite from the list', () => {
    mockCharactersQuery();

    renderScreen();

    fireEvent.press(screen.getByLabelText('Favoritar'));

    expect(useFavoriteStore.getState().isFavorite('1')).toBe(true);
    expect(screen.getByLabelText('Remover favorito')).toBeOnTheScreen();
  });

  it('loads the next page on end reached', () => {
    const fetchMore = jest.fn(() => Promise.resolve());

    mockCharactersQuery({
      fetchMore,
      data: {
        characters: {
          info: { count: 2, pages: 2, next: 2, prev: null },
          results: [makeCharacter()],
        },
      },
    });

    renderScreen();

    fireEvent(screen.getByTestId('character-list'), 'onEndReached');

    expect(fetchMore).toHaveBeenCalledWith({
      variables: { page: 2, filter: {} },
    });
  });
});
