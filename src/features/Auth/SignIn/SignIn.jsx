import { NavLink, useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { signInValidation } from '../../../shared/utils/userValidation';
import { useLoginUserMutation } from '../../../entities/User/userApiSlice';
import { login } from '../authSlice';

import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar';
import Button from '../../../shared/ui/Button/Button';
import Input from '../../../shared/ui/Input/Input';
import Loading from '../../../shared/ui/Loading/Loading';
import './SignIn.scss';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({ user: data }).unwrap();
      dispatch(login({ ...response.user, isAuthenticated: true }));
      navigate('/');
      toast.success('Successfully logged in!');
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error?.data?.errors?.message || 'Login failed!');
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    const errorMessages = Object.values(error.data.errors).join(', ') || 'Неизвестная ошибка';
    return <ErrorSnackbar open={true} message={errorMessages} />;
  }

  return (
    <form className="signin" onSubmit={handleSubmit(onSubmit)}>
      <h3 className="signin__title">Sign In</h3>
      <div className="signin__inputs">
        <Controller
          control={control}
          name="email"
          rules={signInValidation.email}
          render={({ field }) => (
            <Input
              type="email"
              name="email"
              errors={errors}
              field={field}
              title="Email address"
              autocomplete="email"
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={signInValidation.password}
          render={({ field }) => (
            <Input
              type="password"
              name="password"
              errors={errors}
              field={field}
              title="Password"
              autocomplete="current-password"
            />
          )}
        />
      </div>

      <Button text="Login" />
      <p className="signin__quest">
        Don’t have an account? <NavLink to={'/sign-up'}>Sign Up</NavLink>
      </p>
    </form>
  );
};

export default SignIn;
