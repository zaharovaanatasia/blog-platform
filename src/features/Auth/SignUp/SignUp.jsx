import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

import { signUpValidation } from '../../../shared/utils/userValidation.js';
import { login } from '../authSlice.js';
import { useRegisterUserMutation } from '../../../entities/User/userApiSlice.js';
import Button from '../../../shared/ui/Button/Button.jsx';
import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar.jsx';
import Input from '../../../shared/ui/Input/Input.jsx';
import Loading from '../../../shared/ui/Loading/Loading.jsx';

import './SignUp.scss';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      agree: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const { username, email, password } = data;
      const normalizedEmail = email ? email.toLowerCase() : '';

      const defaultImage = 'https://static.productionready.io/images/smiley-cyrus.jpg';

      const response = await registerUser({
        user: { username, email: normalizedEmail, password, image: defaultImage },
      }).unwrap();

      const responseData = { ...response.user, image: response.user.image || defaultImage };

      dispatch(login(responseData));
      navigate('/');
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error(error.message);
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    const errorMessages = Object.values(error.data.errors).join(', ') || 'Неизвестная ошибка';
    return <ErrorSnackbar open={true} message={errorMessages} />;
  }

  return (
    <form className="signup" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="signup__title"> Create a new account</h3>
      <div className="signup__inputs">
        <Controller
          control={control}
          name="username"
          rules={signUpValidation.username}
          render={({ field }) => (
            <Input
              title="Username"
              name="username"
              errors={errors}
              field={field}
              autocomplete="username"
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={signUpValidation.email}
          render={({ field }) => (
            <Input
              title="Email address"
              name="email"
              type="email"
              errors={errors}
              field={field}
              autocomplete="email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={signUpValidation.password}
          render={({ field }) => (
            <Input
              title="Password"
              name="password"
              type="password"
              errors={errors}
              field={field}
              autocomplete="new-password"
            />
          )}
        />

        <Controller
          control={control}
          name="repeatPassword"
          rules={signUpValidation.repeatPassword}
          render={({ field }) => (
            <Input
              title="Repeat Password"
              name="repeatPassword"
              type="password"
              errors={errors}
              field={field}
              autocomplete="new-password"
            />
          )}
        />
      </div>

      <div className="signup__line"></div>
      <label className={`signup__agree ${errors.agree ? 'has-error' : ''}`}>
        <input
          type="checkbox"
          {...register('agree', {
            required: signUpValidation.agree.required,
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

export default SignUp;
