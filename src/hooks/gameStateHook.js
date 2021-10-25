import { useEffect, useState, useCallback } from 'react';
import { newShuffledDeck, drawCardsFromDeck } from '../services/apiService';
import { getScore } from '../services/blackjackService';
import { STATUSES, PLAYERS, BLACKJACK_VALUE, DEALER_MIN_VALUE } from '../constants';

const { IDLE, PLAYER_TURN, DEALER_TURN, PLAYER_WINS, BLACKJACK, DEALER_WINS } = STATUSES;

const { PLAYER, DEALER } = PLAYERS;

const initialState = {
  deckId: null,
  dealerCards: [],
  playerCards: []
};

export function useGameState() {
  const [gameState, setGameState] = useState(initialState);
  const [gameStatus, setGameStatus] = useState(IDLE);

  const setGameStatusWithDelay = (gameStatus) => {
    setTimeout(() => {
      setGameStatus(gameStatus);
    }, 1000);
  };

  const newGame = async () => {
    const { deck_id: deckId } = await newShuffledDeck();
    const { cards } = await drawCardsFromDeck(deckId, 4);

    setGameState({
      ...initialState,
      deckId,
      dealerCards: cards.slice(0, 2),
      playerCards: cards.slice(2, 4)
    });
    setGameStatus(PLAYER_TURN);
  };

  const playerStand = () => {
    dispatch(setGameStatus(DEALER_TURN));
  };

  const drawCard = useCallback(
    async (player) => {
      const { cards } = await drawCardsFromDeck(gameState.deckId, 1);

      setGameState({
        ...gameState,
        playerCards: player === PLAYER ? [...gameState.playerCards, ...cards] : gameState.playerCards,
        dealerCards: player === DEALER ? [...gameState.dealerCards, ...cards] : gameState.dealerCards
      });
    },
    [gameState]
  );

  const playerHit = () => {
    dispatch(setPlayer(PLAYER));
    dispatch(drawCard());
  };

  useEffect(() => {
    const dealerScore = getScore(dealerCards);
    const playerScore = getScore(playerCards);

    if (gameStatus === PLAYER_TURN) {
      if (playerScore === BLACKJACK_VALUE) {
        if (gameState.playerCards.length === 2) {
          setGameStatusWithDelay(BLACKJACK);
        } else {
          dispatch(setGameStatusWithDelay(PLAYER_WINS));
        }
      } else if (playerScore > BLACKJACK_VALUE) {
        dispatch(setGameStatusWithDelay(DEALER_WINS));
      }
    } else if (gameStatus === DEALER_TURN) {
      if (dealerScore < DEALER_MIN_VALUE) {
        dispatch(setPlayer(DEALER));
        dispatch(drawCard());
      } else {
        if ((dealerScore > playerScore && dealerScore <= BLACKJACK_VALUE) || dealerScore === playerScore) {
          dispatch(setGameStatusWithDelay(DEALER_WINS));
        } else {
          dispatch(setGameStatusWithDelay(PLAYER_WINS));
        }
      }
    }
  }, [dealerCards, playerCards, gameStatus, dispatch]);

  // newGame
  useEffect(() => {
    dispatch(setGameState(initialState));
    dispatch(setGameStatus(PLAYER_TURN));
  }, [initialState.deckId, dispatch]);

  return [gameState, gameStatus, newGame, playerStand, playerHit];
}
