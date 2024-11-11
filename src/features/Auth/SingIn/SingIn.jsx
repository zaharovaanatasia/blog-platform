import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { useLoginUserMutation } from '../../../entities/User/userApiSlice';
import { login } from '../authSlice';

import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar';
import Button from '../../../shared/ui/Button/Button';
import Input from '../../../shared/ui/Input/Input';
import Loading from '../../../shared/ui/Loading/Loading';
import './SingIn.scss';

const SingIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

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
        <Input
          type="email"
          name="email"
          register={register}
          errors={errors}
          title="Email address"
          validation={{
            required: 'Email is required',
            pattern: { value: /^\S+@\S+$/, message: 'Invalid email address' },
          }}
        ></Input>
        <Input
          register={register}
          name="password"
          errors={errors}
          type="password"
          title="Password"
          validation={{
            required: 'Password is required',
          }}
        ></Input>
      </div>
      <Button text="Login"></Button>
      <p className="signin__quest">
        Don’t have an account? <NavLink to={'/sign-un'}>Sign Up</NavLink>
      </p>
    </form>
  );
};

export default SingIn;
