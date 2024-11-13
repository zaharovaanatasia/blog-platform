import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

import { articleValidation } from '../../utils/articleValidation';
import Input from '../Input/Input';
import './ArticleForm.scss';

const ArticleForm = ({ text, onSubmit, initialValues = {} }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      ...initialValues,
      tags: initialValues.tags?.length
        ? initialValues.tags.map((tag) => ({ value: tag.value })) // Используем только value
        : [{ value: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tags',
  });

  const handleFormSubmit = (data) => {
    const tags = data.tags.filter((tag) => tag.value.trim() !== '');
    onSubmit({ ...data, tags });
  };

  return (
    <form className="create" onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className="create__title">{text}</h3>
      <div className="create__inputs">
        <Controller
          control={control}
          name="Title"
          rules={articleValidation.Title}
          render={({ field }) => (
            <Input title="Title" name="Title" type="text" field={field} errors={errors} />
          )}
        />

        <Controller
          control={control}
          name="Short description"
          rules={articleValidation['Short description']}
          render={({ field }) => (
            <Input
              title="Short description"
              name="Short description"
              type="text"
              field={field}
              errors={errors}
            />
          )}
        />

        <Controller
          control={control}
          name="Text"
          rules={articleValidation.Text}
          render={({ field }) => (
            <Input
              title="Text"
              name="Text"
              type="textarea"
              height="170px"
              field={field}
              errors={errors}
            />
          )}
        />
      </div>

      <div className="create__tags tags">
        <div className="form__title tags__title">Tags</div>
        <div className="tags__content">
          <div className="tags__inputs">
            {fields.map((field, index) => (
              <Controller
                key={field.id}
                control={control}
                name={`tags[${index}].value`}
                defaultValue={field.value}
                render={({ field }) => {
                  return (
                    <div className="tags__item">
                      <Input
                        title=""
                        name={`tags[${index}].value`}
                        type="text"
                        field={field}
                        errors={errors}
                      />
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => remove(index)}
                        sx={{ width: 120, height: 42 }}
                        disabled={fields.length === 1}
                      >
                        Delete
                      </Button>
                    </div>
                  );
                }}
              />
            ))}
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => append({ value: '' })}
            sx={{ width: 120, height: 42 }}
          >
            Add tag
          </Button>
        </div>
      </div>

      <Button variant="contained" color="primary" sx={{ width: 317, height: 42 }} type="submit">
        Send
      </Button>
    </form>
  );
};

ArticleForm.propTypes = {
  text: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
};

export default ArticleForm;
