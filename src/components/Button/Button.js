import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Button.module.scss';

export const buttonColors = {
  NEUTRAL: 'neutral',
  WARNING: 'warning',
  SUCCESS: 'success'
};

function Button({ onClick, emoji = '', color, children, disabled = false }) {
  return (
    <button
      className={clsx(styles.Button, {
        [styles.neutral]: color === buttonColors.NEUTRAL,
        [styles.warning]: color === buttonColors.WARNING,
        [styles.success]: color === buttonColors.SUCCESS
      })}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {emoji && (
        <span aria-hidden className={styles.emoji}>
          {emoji}
        </span>
      )}
      {children}
    </button>
  );
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  emoji: PropTypes.string,
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};

export default Button;
