import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import { Star } from 'lucide-react-native';
import styled, { useTheme } from 'styled-components/native';
import { useTranslation } from 'react-i18next';

type FavoriteButtonProps = {
  active: boolean;
  onPress: (event: GestureResponderEvent) => void;
  size?: 'sm' | 'md';
};

export function FavoriteButton({
  active,
  onPress,
  size = 'md',
}: FavoriteButtonProps) {
  const { t } = useTranslation();
  const theme = useTheme();
  const iconSize = size === 'sm' ? 20 : 24;
  const iconColor = active ? theme.colors.favorite : theme.colors.favoriteMuted;

  return (
    <Button
      accessibilityRole="button"
      accessibilityLabel={
        active ? t('common.unfavorite') : t('common.favorite')
      }
      $size={size}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.56 : 1 })}
    >
      <Star
        size={iconSize}
        color={iconColor}
        fill={active ? theme.colors.favorite : 'transparent'}
        strokeWidth={active ? 2.5 : 2}
      />
    </Button>
  );
}

const Button = styled.Pressable<{ $size: 'sm' | 'md' }>`
  width: ${({ $size }) => ($size === 'sm' ? 40 : 48)}px;
  height: ${({ $size }) => ($size === 'sm' ? 40 : 48)}px;
  align-items: center;
  justify-content: center;
  border-width: 0;
  background-color: transparent;
`;
