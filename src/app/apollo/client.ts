import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const API_URL = 'https://rickandmortyapi.com/graphql';

export const apolloClient = new ApolloClient({
  link: new HttpLink({ uri: API_URL }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          characters: {
            keyArgs: ['filter'],
            merge(existing, incoming, { args }) {
              if (!existing || args?.page === 1) {
                return incoming;
              }

              return {
                ...incoming,
                results: [
                  ...(existing.results ?? []),
                  ...(incoming.results ?? []),
                ],
              };
            },
          },
        },
      },
    },
  }),
});
