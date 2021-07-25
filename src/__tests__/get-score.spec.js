import getScore from '../utils/get-score';
import { CARDS } from '../constants';

const { ACE, JACK, QUEEN, KING } = CARDS;

describe('blackjackService', () => {
  describe('blackjackService.getScore', () => {
    test('getScore: with number do sum', () => {
      expect(getScore([{ value: '2' }, { value: '2' }])).toBe(4);
    });

    test('getScore: heads is 10', () => {
      expect(getScore([{ value: JACK }, { value: 2 }])).toBe(12);
      expect(getScore([{ value: QUEEN }, { value: 3 }])).toBe(13);
      expect(getScore([{ value: KING }, { value: 9 }])).toBe(19);
    });

    test('getScore: ACE is 1 or 10', () => {
      expect(getScore([{ value: ACE }, { value: 2 }])).toBe(13);
      expect(getScore([{ value: ACE }, { value: ACE }])).toBe(12);
      expect(getScore([{ value: ACE }, { value: 10 }])).toBe(21);
      expect(getScore([{ value: ACE }, { value: 10 }, { value: 2 }])).toBe(13);
      expect(getScore([{ value: ACE }, { value: ACE }, { value: ACE }])).toBe(13);
      expect(getScore([{ value: ACE }, { value: ACE }, { value: 2 }])).toBe(14);
    });
  });
});
