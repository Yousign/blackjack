import PropTypes from 'prop-types';
import styles from './Card.module.scss';

function Card({ code }) {
  return (
    <li className={styles.Card}>
      <img className={styles.Image} src={`/assets/cards/${code}.svg`} alt="" />
    </li>
  );
}

Card.propTypes = {
  code: PropTypes.string.isRequired
};

export default Card;
