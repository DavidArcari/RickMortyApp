import React from 'react';
import type { GestureResponderEvent } from 'react-native';
import styled from 'styled-components/native';
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

  return (
    <Button
      accessibilityRole="button"
      accessibilityLabel={
        active ? t('common.unfavorite') : t('common.favorite')
      }
      $active={active}
      $size={size}
      onPress={onPress}
    >
      <ButtonText $active={active}>{active ? 'Saved' : 'Save'}</ButtonText>
    </Button>
  );
}

const Button = styled.Pressable<{ $active: boolean; $size: 'sm' | 'md' }>`
  min-width: ${({ $size }) => ($size === 'sm' ? 64 : 88)}px;
  min-height: ${({ $size }) => ($size === 'sm' ? 36 : 44)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  border-width: 1px;
  border-color: ${({ theme, $active }) =>
    $active ? theme.colors.favorite : theme.colors.border};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.favorite : theme.colors.surface};
`;

const ButtonText = styled.Text<{ $active: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.colors.background : theme.colors.text};
  font-size: 13px;
  font-weight: 700;
`;
