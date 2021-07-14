import { CARDS } from '../constants';

const { JACK, QUEEN, KING, ACE } = CARDS;

export const getScore = (cards) => {
  const rearranged = [];
  cards.forEach((card) => {
    if (card.value === ACE) {
      rearranged.push(card);
    } else if (card.value) {
      rearranged.unshift(card);
    }
  });

  return rearranged.reduce((total, card) => {
    if (card.value === JACK || card.value === QUEEN || card.value === KING) {
      return total + 10;
    } else if (card.value === ACE) {
      return total + 11 <= 21 ? total + 11 : total + 1;
    } else {
      return total + parseInt(card.value, 0);
    }
  }, 0);
};
