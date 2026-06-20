export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterGender = 'Female' | 'Male' | 'Genderless' | 'unknown';

export type CharacterFilters = {
  name?: string;
  status?: CharacterStatus;
  species?: string;
  gender?: CharacterGender;
};

export type PageInfo = {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
};

export type Episode = {
  id: string;
  name: string;
  episode: string;
  air_date: string;
};

export type CharacterSummary = {
  id: string;
  name: string;
  image: string;
  status: CharacterStatus;
  species: string;
  gender: CharacterGender;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
};

export type CharacterDetails = CharacterSummary & {
  type: string;
  episode: Episode[];
};

export type CharactersQueryData = {
  characters: {
    info: PageInfo;
    results: CharacterSummary[];
  } | null;
};

export type CharactersQueryVariables = {
  page: number;
  filter?: CharacterFilters;
};

export type CharacterQueryData = {
  character: CharacterDetails | null;
};

export type CharacterQueryVariables = {
  id: string;
};
