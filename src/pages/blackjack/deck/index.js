import { newShuffledDeck } from '../../../app/services/cards';

import { wrapper } from '../../../app/store.ts';

function App() {
  return null;
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const {
    data: { deck_id }
  } = await store.dispatch(newShuffledDeck.initiate(null));

  if (deck_id) {
    return {
      redirect: {
        destination: `/blackjack/deck/${deck_id}`,
        permanent: false
      }
    };
  }

  return { props: {} };
});

export default App;
