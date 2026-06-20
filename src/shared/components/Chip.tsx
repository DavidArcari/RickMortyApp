import React from 'react';
import styled from 'styled-components/native';

type ChipProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function Chip({ label, selected, onPress }: ChipProps) {
  return (
    <Container
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{ selected }}
      $selected={selected}
      disabled={!onPress}
      onPress={onPress}
    >
      <Label $selected={selected}>{label}</Label>
    </Container>
  );
}

const Container = styled.Pressable<{ $selected?: boolean }>`
  min-height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  border-width: 1px;
  border-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primaryMuted : theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.xs}px
    ${({ theme }) => theme.spacing.md}px;
`;

const Label = styled.Text<{ $selected?: boolean }>`
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.text};
  font-size: 14px;
  font-weight: 700;
`;
