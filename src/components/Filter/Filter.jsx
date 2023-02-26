import styles from './filter.module.css';
import propTypes from 'prop-types';

const Filter = ({ filter, onChange }) => {
  return (
    <label>
      <span className={styles.span}>Find contacts by name</span>
      <input type="text" name="filter" value={filter} onChange={onChange} />
    </label>
  );
};

Filter.propTypes = {
  filter: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
export default Filter;
