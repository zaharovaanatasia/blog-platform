import './Input.scss';

const Input = ({ title, type, register, errors, name, validation, height }) => {
  return (
    <div className="form">
      <label className="form__title" htmlFor={title}>
        {title}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={`form__input ${errors[name] ? 'error-border' : ''}`}
          id={name}
          placeholder={title}
          style={{ minHeight: height, resize: 'none', overflow: 'auto' }}
          {...register(name, validation)}
        ></textarea>
      ) : (
        <input
          className={`form__input ${errors[name] ? 'error-border' : ''}`}
          id={name}
          type={type}
          placeholder={title}
          {...register(name, validation)}
        />
      )}
      {errors[name] && <p className="form__error">{errors[name].message}</p>}
    </div>
  );
};

export default Input;
