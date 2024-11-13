import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({ title, type, field, errors, name, height, autocomplete }) => {
  return (
    <div className="form">
      <label className="form__title" htmlFor={name}>
        {title}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={`form__input ${errors[name] ? 'error-border' : ''}`}
          id={name}
          placeholder={title}
          style={{ minHeight: height, resize: 'none', overflow: 'auto' }}
          {...field}
        ></textarea>
      ) : (
        <input
          className={`form__input ${errors[name] ? 'error-border' : ''}`}
          id={name}
          type={type}
          placeholder={title}
          {...field}
          autoComplete={autocomplete}
        />
      )}
      {errors[name] && <p className="form__error">{errors[name].message}</p>}
    </div>
  );
};

Input.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string,
  errors: PropTypes.object,
  name: PropTypes.string.isRequired,
  field: PropTypes.object,
  height: PropTypes.string,
  autocomplete: PropTypes.string,
};

export default Input;
