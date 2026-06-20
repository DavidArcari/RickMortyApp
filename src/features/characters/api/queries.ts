import { gql } from '@apollo/client';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import type {
  CharacterQueryData,
  CharacterQueryVariables,
  CharactersQueryData,
  CharactersQueryVariables,
} from '../types';

export const CHARACTERS_QUERY: TypedDocumentNode<
  CharactersQueryData,
  CharactersQueryVariables
> = gql`
  query Characters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        image
        status
        species
        gender
        origin {
          name
        }
        location {
          name
        }
      }
    }
  }
`;

export const CHARACTER_QUERY: TypedDocumentNode<
  CharacterQueryData,
  CharacterQueryVariables
> = gql`
  query Character($id: ID!) {
    character(id: $id) {
      id
      name
      image
      status
      species
      type
      gender
      origin {
        name
      }
      location {
        name
      }
      episode {
        id
        name
        episode
        air_date
      }
    }
  }
`;
