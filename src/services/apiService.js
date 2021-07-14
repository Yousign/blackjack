export const endpoint = 'https://deckofcardsapi.com/api';
export const deck = `${endpoint}/deck`;
const toJson = (response) => response.json();

export const newShuffledDeck = (deckCount = 6) =>
  fetch(`${deck}/new/shuffle/?deck_count=${deckCount}`).then(toJson);
export const drawCardsFromDeck = (deckId, count = 1) =>
  fetch(`${deck}/${deckId}/draw/?count=${count}`).then(toJson);
