import React, { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { NetworkStatus } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styled, { useTheme } from 'styled-components/native';
import type { RootStackParamList } from '../../../app/navigation/types';
import { Chip } from '../../../shared/components/Chip';
import { StateView } from '../../../shared/components/StateView';
import { useDebouncedValue } from '../../../shared/hooks/useDebouncedValue';
import { useFavoriteStore } from '../../../store/favoriteStore';
import { CHARACTERS_QUERY } from '../api/queries';
import { CharacterCard } from '../components/CharacterCard';
import { FilterControls } from '../components/FilterControls';
import { PreferenceControls } from '../components/PreferenceControls';
import type {
  CharacterFilters,
  CharacterSummary,
  CharactersQueryData,
  CharactersQueryVariables,
} from '../types';
import { cleanFilters, hasActiveFilters } from '../utils/filters';

type Props = NativeStackScreenProps<RootStackParamList, 'CharacterList'>;

export function CharacterListScreen({ navigation }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState<CharacterFilters>({});
  const debouncedSearch = useDebouncedValue(search, 400);
  const favoriteIds = useFavoriteStore(state => state.favoriteIds);
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  const queryFilter = useMemo(
    () => cleanFilters({ ...filters, name: debouncedSearch }),
    [debouncedSearch, filters],
  );

  const { data, error, loading, networkStatus, refetch, fetchMore } = useQuery<
    CharactersQueryData,
    CharactersQueryVariables
  >(CHARACTERS_QUERY, {
    variables: {
      page: 1,
      filter: queryFilter,
    },
    notifyOnNetworkStatusChange: true,
  });

  const characters = data?.characters?.results ?? [];
  const nextPage = data?.characters?.info.next;
  const initialLoading = loading && networkStatus === NetworkStatus.loading;
  const refreshing = networkStatus === NetworkStatus.refetch;
  const loadingMore = networkStatus === NetworkStatus.fetchMore;

  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const listContentStyle = useMemo(
    () => ({
      flexGrow: 1,
      gap: theme.spacing.md,
      padding: theme.spacing.md,
      paddingBottom: theme.spacing.xl + insets.bottom,
    }),
    [insets.bottom, theme.spacing.md, theme.spacing.xl],
  );

  const handleLoadMore = useCallback(() => {
    if (!nextPage || loadingMore) {
      return;
    }

    fetchMore({
      variables: {
        page: nextPage,
        filter: queryFilter,
      },
    }).catch(() => undefined);
  }, [fetchMore, loadingMore, nextPage, queryFilter]);

  const handleRefresh = useCallback(() => {
    refetch({ page: 1, filter: queryFilter }).catch(() => undefined);
  }, [queryFilter, refetch]);

  const clearFilters = () => {
    setSearch('');
    setFilters({});
  };

  const renderItem = ({ item }: { item: CharacterSummary }) => (
    <CharacterCard
      character={item}
      favorite={favoriteSet.has(item.id)}
      onPress={() =>
        navigation.navigate('CharacterDetails', { characterId: item.id })
      }
      onToggleFavorite={() => toggleFavorite(item.id)}
    />
  );

  if (initialLoading) {
    return <StateView loading title={t('common.loading')} />;
  }

  if (error && characters.length === 0) {
    return (
      <StateView
        title={t('list.errorTitle')}
        description={error.message}
        actionLabel={t('common.retry')}
        onAction={handleRefresh}
      />
    );
  }

  return (
    <Screen $top={insets.top}>
      <Header>
        <Title>{t('list.title')}</Title>
        <PreferenceControls />
        <SearchInput
          accessibilityLabel={t('list.searchPlaceholder')}
          placeholder={t('list.searchPlaceholder')}
          placeholderTextColor={theme.colors.textMuted}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        <Toolbar>
          <Chip
            label={t('list.filters')}
            selected={filtersVisible || hasActiveFilters(filters)}
            onPress={() => setFiltersVisible(value => !value)}
          />
          <Chip label={t('list.clear')} onPress={clearFilters} />
        </Toolbar>
        {filtersVisible ? (
          <FilterControls filters={filters} onChange={setFilters} />
        ) : null}
      </Header>

      <FlatList
        data={characters}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={listContentStyle}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            tintColor={theme.colors.primary}
            onRefresh={handleRefresh}
          />
        }
        ListEmptyComponent={
          <StateView
            title={t('list.emptyTitle')}
            description={t('list.emptyDescription')}
          />
        }
        ListFooterComponent={
          loadingMore ? (
            <Footer>
              <ActivityIndicator color={theme.colors.primary} />
            </Footer>
          ) : null
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.4}
      />
    </Screen>
  );
}

const Screen = styled.View<{ $top: number }>`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding-top: ${({ $top }) => $top}px;
`;

const Header = styled.View`
  gap: ${({ theme }) => theme.spacing.md}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md}px;
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 30px;
  font-weight: 900;
`;

const SearchInput = styled.TextInput`
  min-height: 48px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: 0 ${({ theme }) => theme.spacing.md}px;
`;

const Toolbar = styled.View`
  flex-direction: row;
  gap: ${({ theme }) => theme.spacing.sm}px;
`;

const Footer = styled.View`
  min-height: 56px;
  align-items: center;
  justify-content: center;
`;
