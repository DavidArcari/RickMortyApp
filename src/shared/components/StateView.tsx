import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {useTheme} from 'styled-components/native';

type StateViewProps = {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  loading?: boolean;
};

export function StateView({
  title,
  description,
  actionLabel,
  onAction,
  loading,
}: StateViewProps) {
  const theme = useTheme();

  return (
    <Container>
      {loading ? <ActivityIndicator color={theme.colors.primary} /> : null}
      <Title>{title}</Title>
      {description ? <Description>{description}</Description> : null}
      {actionLabel && onAction ? (
        <Action accessibilityRole="button" onPress={onAction}>
          <ActionText>{actionLabel}</ActionText>
        </Action>
      ) : null}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.spacing.xl}px ${({theme}) => theme.spacing.lg}px;
  gap: ${({theme}) => theme.spacing.sm}px;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;

const Description = styled.Text`
  color: ${({theme}) => theme.colors.textMuted};
  font-size: 14px;
  line-height: 20px;
  text-align: center;
`;

const Action = styled.Pressable`
  min-height: 44px;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme}) => theme.radius.sm}px;
  background-color: ${({theme}) => theme.colors.primary};
  padding: ${({theme}) => theme.spacing.sm}px ${({theme}) => theme.spacing.md}px;
`;

const ActionText = styled.Text`
  color: ${({theme}) => theme.colors.background};
  font-size: 14px;
  font-weight: 700;
`;
