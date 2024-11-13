import PropTypes from 'prop-types';

import './Button.scss';

const Button = ({ text }) => {
  return <button className="button">{text}</button>;
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Button;
