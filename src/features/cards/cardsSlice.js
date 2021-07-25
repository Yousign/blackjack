import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import cardApi from '../../app/services/cards';

import { STATUSES, PLAYERS } from '../../constants';

const { IDLE } = STATUSES;

const { PLAYER, DEALER } = PLAYERS;

const initialState = {
  deckId: null,
  dealerCards: [],
  playerCards: [],
  gameStatus: IDLE,
  player: PLAYER
};

export const setGameStatusWithDelay = createAsyncThunk(
  'cards/setGameStatusWithDelay',
  async (gameStatus, thunkAPI) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(gameStatus);
      }, 1000);
    });
  }
);

export const drawCard = createAsyncThunk('cards/drawCard', async (_, { getState, dispatch }) => {
  const { deckId } = getState().cards;
  const { data } = await dispatch(cardApi.endpoints.drawCardsFromDeck.initiate({ deckId, count: 1 }));

  return data;
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setGameState(state, action) {
      state.deckId = action.payload.deckId;
      state.dealerCards = action.payload.dealerCards;
      state.playerCards = action.payload.playerCards;
    },
    setGameStatus(state, action) {
      state.gameStatus = action.payload;
    },
    setPlayer(state, action) {
      state.player = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setGameStatusWithDelay.fulfilled, (state, action) => {
      state.gameStatus = action.payload;
    }),
      builder.addCase(drawCard.fulfilled, (state, action) => {
        const { player } = state;
        const { cards } = action.payload;
        state.playerCards = player === PLAYER ? [...state.playerCards, ...cards] : state.playerCards;
        state.dealerCards = player === DEALER ? [...state.dealerCards, ...cards] : state.dealerCards;
      });
  }
});

export const { setGameState, setGameStatus, setPlayer } = cardsSlice.actions;

export default cardsSlice.reducer;
