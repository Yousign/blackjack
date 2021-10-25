import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { useGameState } from '../../../hooks/gameStateHook';
import DealerHand from '../../../components/DealerHand/DealerHand';
import Message from '../../../components/Message/Message';

import PlayerHand from '../../../components/PlayerHand/PlayerHand';
import Button, { buttonColors } from '../../../components/Button/Button';
import Actions from '../../../components/Actions/Actions';
import { STATUSES } from '../../../constants';

import { drawCardsFromDeck } from '../../../app/services/cards';
import { wrapper } from '../../../app/store.ts';

import styles from '../../../styles/App.module.scss';

function App(initialState) {
  const router = useRouter();
  const { t } = useTranslation('blackjack');
  const [{ dealerCards, playerCards }, gameStatus, playerStand, playerHit] = useGameState(initialState);

  const handleClick = (e) => {
    e.preventDefault();
    router.push('/blackjack/deck');
  };

  const PlayButton = () => (
    <Button className={styles.LetsPlay} type="button" onClick={handleClick} color={buttonColors.NEUTRAL}>
      {t('play')}
    </Button>
  );

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ query }) => {
  // newGame
  const { deck_id: deckId } = query;
  const {
    data: { cards }
  } = await store.dispatch(drawCardsFromDeck.initiate({ deckId, count: 4 }));
  const dealerCards = cards.slice(0, 2);
  const playerCards = cards.slice(2, 4);

  console.log('State on server', store.getState());

  return {
    props: {
      deckId,
      dealerCards,
      playerCards
    }
  };
});

export default App;
