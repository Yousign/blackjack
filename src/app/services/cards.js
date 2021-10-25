import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cardApi = createApi({
  reducerPath: 'cardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://deckofcardsapi.com/api/' }),
  entityTypes: ['Cards'],
  endpoints: (builder) => ({
    newShuffledDeck: builder.mutation({
      query: (deckCount) => {
        const deck_count = deckCount ?? 6;
        const params = new URLSearchParams();
        params.append('deck_count', deck_count);

        return {
          url: 'deck/new/shuffle/',
          method: 'POST',
          body: params
        };
      }
    }),
    drawCardsFromDeck: builder.mutation({
      query: ({ deckId, count = 1 }) => {
        const params = new URLSearchParams();
        params.append('count', count);

        return {
          url: `deck/${deckId}/draw/`,
          method: 'POST',
          body: params
        };
      }
    }),
    shuffleCardsFromDeck: builder.mutation({
      query: ({ deckId }) => `deck/${deckId}/shuffle/`
    })
  })
});

// Export hooks for usage in functional components
export const { useNewShuffledDeckMutation, useDrawCardsFromDeckMutation, useShuffleCardsFromDeckMutation } =
  cardApi;

// Possible exports
export const { newShuffledDeck, drawCardsFromDeck, shuffleCardsFromDeck } = cardApi.endpoints;

export default cardApi;
