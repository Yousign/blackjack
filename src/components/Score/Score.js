import PropTypes from 'prop-types';
import styles from './Score.module.scss';

function Score({ children, ariaLabel }) {
  return (
    <div className={styles.Score} aria-live="polite" aria-label={ariaLabel}>
      {children}
    </div>
  );
}

Score.propTypes = {
  children: PropTypes.node.isRequired,
  ariaLabel: PropTypes.string.isRequired
};

export default Score;
