import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';

import Button, { buttonColors } from '../Button/Button';
import styles from './Actions.module.scss';

function Actions({ playerHit, playerStand, disabled }) {
  const { t } = useTranslation('blackjack');

  return (
    <div className={styles.Actions}>
      <Button disabled={disabled} onClick={playerStand} color={buttonColors.WARNING} emoji="🖐">
        {t`stand`}
      </Button>
      <Button disabled={disabled} onClick={playerHit} color={buttonColors.SUCCESS} emoji="👉">
        {t`hit`}
      </Button>
    </div>
  );
}

Actions.propTypes = {
  playerHit: PropTypes.func.isRequired,
  playerStand: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default Actions;
