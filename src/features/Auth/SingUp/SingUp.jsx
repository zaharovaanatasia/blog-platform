import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { login } from '../../Auth/authSlice.js';
import { useRegisterUserMutation } from '../../../entities/User/userApiSlice.js';
import Button from '../../../shared/ui/Button/Button';
import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar';
import Input from '../../../shared/ui/Input/Input';
import Loading from '../../../shared/ui/Loading/Loading';
import './SingUp.scss';

const SingUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onChange' });

  const onSubmit = async (data) => {
    try {
      const { username, email, password } = data;
      const normalizedEmail = email.toLowerCase();

      const response = await registerUser({
        user: { username, email: normalizedEmail, password },
      }).unwrap();
      dispatch(login(response.user));
      navigate('/');
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.message);
    }
  };

  const password = watch('password');

  if (isLoading) return <Loading />;

  if (error) {
    const errorMessages = Object.values(error.data.errors).join(', ') || 'Неизвестная ошибка';
    return <ErrorSnackbar open={true} message={errorMessages} />;
  }

  return (
    <form className="signup" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="signup__title"> Create a new account</h3>
      <div className="signup__inputs">
        <Input
          title="Username"
          name="username"
          register={register}
          errors={errors}
          validation={{
            required: 'Username is required',
            minLength: { value: 3, message: 'Username must be at least 3 characters' },
            maxLength: { value: 20, message: 'Username must be at most 20 characters' },
          }}
        />
        <Input
          title="Email address"
          name="email"
          type="email"
          register={register}
          errors={errors}
          validation={{
            required: 'Email is required',
            pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
          }}
        />
        <Input
          title="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          validation={{
            required: 'Password is required',
            minLength: { value: 6, message: 'Password must be at least 6 characters' },
            maxLength: { value: 40, message: 'Password must be at most 40 characters' },
          }}
        />
        <Input
          title="Repeat Password"
          name="repeatPassword"
          type="password"
          register={register}
          errors={errors}
          validation={{
            required: 'Repeat Password is required',
            validate: (value) => value === password || 'Passwords do not match',
          }}
        />
      </div>

      <div className="signup__line"></div>
      <label className={`signup__agree ${errors.agree ? 'has-error' : ''}`}>
        <input
          type="checkbox"
          {...register('agree', {
            required: 'You must agree to the processing of personal information',
          })}
        />
        <p>I agree to the processing of my personal information</p>
      </label>
      {errors.agree && <p className="form__error">{errors.agree.message}</p>}

      <Button text="Create"></Button>
      <p className="signup__quest">
        Already have an account? <NavLink to={'/sign-in'}>Sign In</NavLink>
      </p>
    </form>
  );
};

export default SingUp;
