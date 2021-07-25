import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import Button, { buttonColors } from '../../components/Button/Button';

import styles from '../../styles/App.module.scss';

function App() {
  const router = useRouter();
  const { t } = useTranslation('blackjack');

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
      <PlayButton />
    </div>
  );
}

export default App;
