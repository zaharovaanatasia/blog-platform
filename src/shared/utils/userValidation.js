export const signUpValidation = {
  username: {
    required: 'Username is required',
    minLength: { value: 3, message: 'Username must be at least 3 characters' },
    maxLength: { value: 20, message: 'Username must be at most 20 characters' },
  },
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' },
    maxLength: { value: 40, message: 'Password must be at most 40 characters' },
  },
  repeatPassword: {
    required: 'Repeat Password is required',
    validate: (value, { password }) => {
      return value === password || 'Passwords do not match';
    },
  },
  agree: {
    required: 'You must agree to the processing of personal information',
  },
};

export const signInValidation = {
  email: {
    required: 'Email is required',
    pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email address' },
  },
  password: {
    required: 'Password is required',
    minLength: { value: 6, message: 'Password must be at least 6 characters' },
    maxLength: { value: 40, message: 'Password must be at most 40 characters' },
  },
};
