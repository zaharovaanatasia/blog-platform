import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

import { login } from '../../../features/Auth/authSlice';
import { useUpdateUserMutation } from '../../User/userApiSlice';
import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar';
import Loading from '../../../shared/ui/Loading/Loading';
import Button from '../../../shared/ui/Button/Button';
import Input from '../../../shared/ui/Input/Input';

import './Edit.scss';

const Edit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const [updateUser, { isLoading, error }] = useUpdateUserMutation();

  useEffect(() => {
    if (!user?.isAuthenticated) {
      navigate('/login');
    }
  }, [user, navigate]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      email: user.email,
      image: user.image,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (!data.password) {
        data.password = user.password;
      }
      if (!data.image) {
        data.image = user.image || '';
      }

      const updatedUserResponse = await updateUser(data).unwrap();

      if (!updatedUserResponse || !updatedUserResponse.user) {
        throw new Error('Failed to receive updated user data');
      }

      const updatedUser = {
        ...updatedUserResponse.user,
        token: user.token,
        isAuthenticated: true,
      };

      dispatch(login(updatedUser));
      localStorage.setItem('user', JSON.stringify(updatedUser));

      toast.success('Profile updated successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error(error.error || 'An error occurred while updating the profile.');
    }
  };

  if (isLoading) return <Loading />;
  if (error) {
    return <ErrorSnackbar open={true} message={error.error || 'Неизвестная ошибка'} />;
  }

  return (
    <form className="edit" onSubmit={handleSubmit(onSubmit)}>
      <div className="edit__title">Edit Profile</div>
      <div className="edit__inputs">
        <Controller
          control={control}
          name="username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 1,
              message: 'Username cannot be empty',
            },
          }}
          render={({ field }) => (
            <Input title="Username" name="username" errors={errors} field={field} />
          )}
        />
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email address',
            },
          }}
          render={({ field }) => (
            <Input title="Email address" name="email" type="email" errors={errors} field={field} />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Password cannot exceed 40 characters',
            },
          }}
          render={({ field }) => (
            <Input
              title="New password"
              name="password"
              type="password"
              errors={errors}
              field={field}
            />
          )}
        />
        <Controller
          control={control}
          name="image"
          rules={{
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/,
              message: 'Invalid URL for avatar image',
            },
          }}
          render={({ field }) => (
            <Input title="Avatar img (url)" name="image" errors={errors} field={field} />
          )}
        />
      </div>

      <Button text="Save" />
    </form>
  );
};

export default Edit;
