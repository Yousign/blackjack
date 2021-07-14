import PropTypes from 'prop-types';
import { getScore } from '../../services/blackjackService';
import Cards from '../Cards/Cards';

import styles from './DealerHand.module.scss';

import { STATUSES } from '../../constants';
import Score from '../Score/Score';
const { DEALER_TURN, PLAYER_WINS, DEALER_WINS } = STATUSES;

function DealerHand({ gameStatus, dealerCards }) {
  const displayDealerScoreCards = [DEALER_TURN, PLAYER_WINS, DEALER_WINS].includes(gameStatus);
  const dealerCardHead = dealerCards.slice(0, 1);
  const adequateDealerCards = displayDealerScoreCards ? dealerCards : [...dealerCardHead, { code: 'BACK' }];
  const dealerScore = getScore(adequateDealerCards);

  return (
    <div className={styles.Dealer}>
      {dealerCards.length !== 0 && <Score ariaLabel="Dealer score">{dealerScore}</Score>}
      <Cards cards={adequateDealerCards} />
    </div>
  );
}

DealerHand.propTypes = {
  gameStatus: PropTypes.string.isRequired,
  dealerCards: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  ).isRequired
};

export default DealerHand;
