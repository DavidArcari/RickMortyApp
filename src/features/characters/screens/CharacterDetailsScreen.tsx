import React from 'react';
import {FlatList} from 'react-native';
import {useQuery} from '@apollo/client/react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import styled, {useTheme} from 'styled-components/native';
import type {RootStackParamList} from '../../../app/navigation/types';
import {FavoriteButton} from '../../../shared/components/FavoriteButton';
import {StateView} from '../../../shared/components/StateView';
import {useFavoriteStore} from '../../../store/favoriteStore';
import {CHARACTER_QUERY} from '../api/queries';
import type {
  CharacterQueryData,
  CharacterQueryVariables,
  Episode,
} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'CharacterDetails'>;

export function CharacterDetailsScreen({route}: Props) {
  const {t} = useTranslation();
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isFavorite = useFavoriteStore(state =>
    state.isFavorite(route.params.characterId),
  );
  const toggleFavorite = useFavoriteStore(state => state.toggleFavorite);

  const {data, loading, error, refetch} = useQuery<
    CharacterQueryData,
    CharacterQueryVariables
  >(CHARACTER_QUERY, {
    variables: {
      id: route.params.characterId,
    },
  });

  const character = data?.character;

  if (loading) {
    return <StateView loading title={t('common.loading')} />;
  }

  if (error || !character) {
    return (
      <StateView
        title={t('details.errorTitle')}
        description={error?.message}
        actionLabel={t('common.retry')}
        onAction={() => {
          refetch().catch(() => undefined);
        }}
      />
    );
  }

  const header = (
    <Header>
      <HeroImage source={{uri: character.image}} />
      <TitleRow>
        <Name>{character.name}</Name>
        <FavoriteButton
          active={isFavorite}
          onPress={() => toggleFavorite(character.id)}
        />
      </TitleRow>
      <MetaGrid>
        <Info label={t('filters.status')} value={character.status} />
        <Info label={t('details.species')} value={character.species} />
        <Info label={t('details.gender')} value={character.gender} />
        <Info label={t('details.type')} value={character.type || t('common.unknown')} />
        <Info label={t('details.origin')} value={character.origin.name} />
        <Info label={t('details.location')} value={character.location.name} />
      </MetaGrid>
      <SectionTitle>{t('details.episodes')}</SectionTitle>
    </Header>
  );

  return (
    <Screen $bottom={insets.bottom}>
      <FlatList
        data={character.episode}
        keyExtractor={item => item.id}
        ListHeaderComponent={header}
        renderItem={({item}) => <EpisodeRow episode={item} />}
        contentContainerStyle={{
          gap: theme.spacing.sm,
          padding: theme.spacing.md,
          paddingBottom: theme.spacing.xl + insets.bottom,
        }}
      />
    </Screen>
  );
}

function Info({label, value}: {label: string; value: string}) {
  return (
    <InfoBox>
      <InfoLabel>{label}</InfoLabel>
      <InfoValue>{value}</InfoValue>
    </InfoBox>
  );
}

function EpisodeRow({episode}: {episode: Episode}) {
  return (
    <EpisodeCard>
      <EpisodeCode>{episode.episode}</EpisodeCode>
      <EpisodeContent>
        <EpisodeName>{episode.name}</EpisodeName>
        <EpisodeDate>{episode.air_date}</EpisodeDate>
      </EpisodeContent>
    </EpisodeCard>
  );
}

const Screen = styled.View<{$bottom: number}>`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
  padding-bottom: ${({$bottom}) => $bottom}px;
`;

const Header = styled.View`
  gap: ${({theme}) => theme.spacing.md}px;
`;

const HeroImage = styled.Image`
  width: 100%;
  aspect-ratio: 1;
  border-radius: ${({theme}) => theme.radius.md}px;
  background-color: ${({theme}) => theme.colors.surfaceMuted};
`;

const TitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md}px;
`;

const Name = styled.Text`
  flex: 1;
  color: ${({theme}) => theme.colors.text};
  font-size: 28px;
  font-weight: 900;
`;

const MetaGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({theme}) => theme.spacing.sm}px;
`;

const InfoBox = styled.View`
  width: 48%;
  min-height: 72px;
  border-radius: ${({theme}) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.border};
  background-color: ${({theme}) => theme.colors.surface};
  padding: ${({theme}) => theme.spacing.sm}px;
`;

const InfoLabel = styled.Text`
  color: ${({theme}) => theme.colors.textMuted};
  font-size: 12px;
  font-weight: 700;
`;

const InfoValue = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 15px;
  font-weight: 800;
`;

const SectionTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 20px;
  font-weight: 900;
`;

const EpisodeCard = styled.View`
  min-height: 64px;
  flex-direction: row;
  align-items: center;
  gap: ${({theme}) => theme.spacing.md}px;
  border-radius: ${({theme}) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.border};
  background-color: ${({theme}) => theme.colors.surface};
  padding: ${({theme}) => theme.spacing.md}px;
`;

const EpisodeCode = styled.Text`
  width: 56px;
  color: ${({theme}) => theme.colors.primary};
  font-size: 14px;
  font-weight: 900;
`;

const EpisodeContent = styled.View`
  flex: 1;
`;

const EpisodeName = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 15px;
  font-weight: 800;
`;

const EpisodeDate = styled.Text`
  color: ${({theme}) => theme.colors.textMuted};
  font-size: 13px;
`;
