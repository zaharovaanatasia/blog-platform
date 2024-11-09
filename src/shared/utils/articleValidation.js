export const articleValidation = {
  Title: {
    required: 'Title is required',
    minLength: { value: 5, message: 'Title must be at least 5 characters long' },
    maxLength: { value: 100, message: 'Title must be at most 100 characters long' },
    validate: {
      notEmpty: (value) => value.trim() !== '' || 'Title cannot be just spaces',
    },
  },
  'Short description': {
    required: 'Short description is required',
    minLength: { value: 5, message: 'Short description must be at least 5 characters long' },
    maxLength: { value: 200, message: 'Short description must be at most 200 characters long' },
    validate: {
      notEmpty: (value) => value.trim() !== '' || 'Short description cannot be just spaces',
    },
  },
  Text: {
    required: 'Text is required',
    minLength: { value: 5, message: 'Text must be at least 5 characters long' },
    maxLength: { value: 10000, message: 'Text must be at most 10000 characters long' },
    validate: {
      notEmpty: (value) => value.trim() !== '' || 'Text cannot be just spaces',
    },
  },
  tags: {
    required: 'At least one tag is required',
    minLength: { value: 2, message: 'Text must be at least 2 characters long' },
    validate: {
      notEmpty: (value) => value.trim() !== '' || 'Tag cannot be just spaces',
    },
  },
};
