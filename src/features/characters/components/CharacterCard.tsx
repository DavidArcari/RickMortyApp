import React from 'react';
import styled from 'styled-components/native';
import { FavoriteButton } from '../../../shared/components/FavoriteButton';
import type { CharacterSummary } from '../types';

type CharacterCardProps = {
  character: CharacterSummary;
  favorite: boolean;
  onPress: () => void;
  onToggleFavorite: () => void;
};

export function CharacterCard({
  character,
  favorite,
  onPress,
  onToggleFavorite,
}: CharacterCardProps) {
  return (
    <Card accessibilityRole="button" onPress={onPress}>
      <Avatar source={{ uri: character.image }} />
      <Content>
        <Name numberOfLines={1}>{character.name}</Name>
        <Meta numberOfLines={1}>
          {character.status} - {character.species}
        </Meta>
        <Meta numberOfLines={1}>{character.gender}</Meta>
      </Content>
      <FavoriteButton
        active={favorite}
        onPress={event => {
          event?.stopPropagation?.();
          onToggleFavorite();
        }}
        size="sm"
      />
    </Card>
  );
}

const Card = styled.Pressable`
  min-height: 104px;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.sm}px;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  background-color: ${({ theme }) => theme.colors.surfaceMuted};
`;

const Content = styled.View`
  flex: 1;
  gap: ${({ theme }) => theme.spacing.xs}px;
`;

const Name = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 17px;
  font-weight: 800;
`;

const Meta = styled.Text`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
`;
