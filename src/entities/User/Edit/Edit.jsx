import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: user.username,
      email: user.email,
      avatar: user.image,
    },
  });

  const onSubmit = async (data) => {
    try {
      if (!data.password) {
        data.password = user.password;
      }

      if (!data.avatar) {
        data.avatar = user.image;
      }

      const updatedUserResponse = await updateUser(data).unwrap();
      const updatedUser = updatedUserResponse.user;
      updatedUser.token = user.token;

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
        <Input
          title="Username"
          name="username"
          register={register}
          errors={errors}
          validation={{
            required: 'Username is required',
            minLength: {
              value: 1,
              message: 'Username cannot be empty',
            },
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
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: 'Invalid email address',
            },
          }}
        />
        <Input
          title="New password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          validation={{
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            maxLength: {
              value: 40,
              message: 'Password cannot exceed 40 characters',
            },
          }}
        />
        <Input
          title="Avatar img (url)"
          name="avatar"
          register={register}
          errors={errors}
          validation={{
            pattern: {
              value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg|webp))$/,
              message: 'Invalid URL for avatar image',
            },
          }}
        />
      </div>

      <Button text="Save"></Button>
    </form>
  );
};

export default Edit;
