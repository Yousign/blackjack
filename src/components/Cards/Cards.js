import PropTypes from 'prop-types';
import Card from '../Card/Card';
import styles from './Cards.module.scss';

function Cards({ cards }) {
  return (
    <ul className={styles.Cards}>
      {cards.map((card, index) => (
        <Card {...card} key={index} />
      ))}
    </ul>
  );
}

Cards.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired
    })
  ).isRequired
};

export default Cards;
