import PropTypes from 'prop-types';
import { getScore } from '../../services/blackjackService';
import Cards from '../Cards/Cards';
import Score from '../Score/Score';

import styles from './PlayerHand.module.scss';

function PlayerHand({ playerCards }) {
  const playerScore = getScore(playerCards);

  return (
    <div className={styles.Player}>
      <Cards cards={playerCards} />
      {playerCards.length !== 0 && <Score ariaLabel="Your score">{playerScore}</Score>}
    </div>
  );
}

PlayerHand.propTypes = {
  playerCards: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  ).isRequired
};

export default PlayerHand;
