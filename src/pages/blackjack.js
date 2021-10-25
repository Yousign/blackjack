import useTranslation from 'next-translate/useTranslation';

import { useGameState } from '../hooks/gameStateHook';
import DealerHand from '../components/DealerHand/DealerHand';
import Message from '../components/Message/Message';

import PlayerHand from '../components/PlayerHand/PlayerHand';
import Button, { buttonColors } from '../components/Button/Button';
import Actions from '../components/Actions/Actions';
import { STATUSES } from '../constants';

import styles from '../styles/App.module.scss';

function App() {
  const { t } = useTranslation('blackjack');
  const [{ dealerCards, playerCards }, gameStatus, newGame, playerStand, playerHit] = useGameState();

  const PlayButton = () => (
    <Button className={styles.LetsPlay} type="button" onClick={newGame} color={buttonColors.NEUTRAL}>
      {t('play')}
    </Button>
  );

  if (gameStatus === STATUSES.IDLE) {
    return (
      <div className={styles.App}>
        <PlayButton />
      </div>
    );
  }

  return (
    <div className={styles.App}>
      <DealerHand gameStatus={gameStatus} dealerCards={dealerCards} />
      <PlayerHand playerCards={playerCards} />
      <Actions
        playerHit={playerHit}
        playerStand={playerStand}
        disabled={gameStatus !== STATUSES.PLAYER_TURN}
      />
      <Message gameStatus={gameStatus}>
        <PlayButton />
      </Message>
    </div>
  );
}

export default App;
