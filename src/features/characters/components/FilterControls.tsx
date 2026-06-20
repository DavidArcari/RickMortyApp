import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import {Chip} from '../../../shared/components/Chip';
import type {CharacterFilters, CharacterGender, CharacterStatus} from '../types';

type FilterControlsProps = {
  filters: CharacterFilters;
  onChange: (filters: CharacterFilters) => void;
};

const statusOptions: Array<CharacterStatus | undefined> = [
  undefined,
  'Alive',
  'Dead',
  'unknown',
];

const genderOptions: Array<CharacterGender | undefined> = [
  undefined,
  'Female',
  'Male',
  'Genderless',
  'unknown',
];

export function FilterControls({filters, onChange}: FilterControlsProps) {
  const {t} = useTranslation();

  const statusLabel = (status?: CharacterStatus) => {
    if (!status) {
      return t('common.all');
    }
    if (status === 'Alive') {
      return t('common.alive');
    }
    if (status === 'Dead') {
      return t('common.dead');
    }
    return t('common.unknown');
  };

  const genderLabel = (gender?: CharacterGender) => {
    if (!gender) {
      return t('common.all');
    }
    const map = {
      Female: t('filters.female'),
      Male: t('filters.male'),
      Genderless: t('filters.genderless'),
      unknown: t('filters.unknown'),
    };

    return map[gender];
  };

  return (
    <Container>
      <SectionTitle>{t('filters.status')}</SectionTitle>
      <ChipsRow horizontal showsHorizontalScrollIndicator={false}>
        {statusOptions.map(status => (
          <Chip
            key={status ?? 'all-status'}
            label={statusLabel(status)}
            selected={filters.status === status}
            onPress={() => onChange({...filters, status})}
          />
        ))}
      </ChipsRow>

      <SectionTitle>{t('filters.gender')}</SectionTitle>
      <ChipsRow horizontal showsHorizontalScrollIndicator={false}>
        {genderOptions.map(gender => (
          <Chip
            key={gender ?? 'all-gender'}
            label={genderLabel(gender)}
            selected={filters.gender === gender}
            onPress={() => onChange({...filters, gender})}
          />
        ))}
      </ChipsRow>

      <SpeciesInput
        accessibilityLabel={t('filters.species')}
        placeholder={t('list.speciesPlaceholder')}
        placeholderTextColor="#7A847D"
        value={filters.species ?? ''}
        onChangeText={species => onChange({...filters, species})}
      />
    </Container>
  );
}

const Container = styled.View`
  gap: ${({theme}) => theme.spacing.sm}px;
`;

const SectionTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 13px;
  font-weight: 800;
`;

const ChipsRow = styled.ScrollView.attrs(({theme}) => ({
  contentContainerStyle: {
    gap: theme.spacing.sm,
    paddingRight: theme.spacing.md,
  },
}))``;

const SpeciesInput = styled.TextInput`
  min-height: 44px;
  border-radius: ${({theme}) => theme.radius.sm}px;
  border-width: 1px;
  border-color: ${({theme}) => theme.colors.border};
  background-color: ${({theme}) => theme.colors.surface};
  color: ${({theme}) => theme.colors.text};
  padding: 0 ${({theme}) => theme.spacing.md}px;
`;
