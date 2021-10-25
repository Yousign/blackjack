import FocusTrap from 'react-focus-trap';
import { paramCase } from 'param-case';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';

import { STATUSES } from '../../constants';

import styles from './Message.module.scss';

const { BLACKJACK, PLAYER_WINS, DEALER_WINS } = STATUSES;

const Result = ({ gameStatus }) => {
  const { t } = useTranslation('blackjack');
  const result = paramCase(gameStatus);

  return <div className={clsx(styles[result], 'p-2.5')}>{t(result)}</div>;
};

function Message({ gameStatus, children }) {
  if ([BLACKJACK, PLAYER_WINS, DEALER_WINS].includes(gameStatus)) {
    return (
      <>
        <div className={styles.Overlay}></div>
        <FocusTrap>
          <div className={styles.Dialog} role="dialog" aria-labelledby="dialog1Title">
            <div className={styles.Message} aria-live="polite" id="dialog-message">
              <Result gameStatus={gameStatus} />
            </div>
            {children}
          </div>
        </FocusTrap>
      </>
    );
  }

  return null;
}

export default Message;
