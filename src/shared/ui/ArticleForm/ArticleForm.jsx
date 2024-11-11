import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@mui/material';

import { articleValidation } from '../../utils/articleValidation';
import Input from '../Input/Input';
import Tag from '../Tag/Tag';
import './ArticleForm.scss';

const ArticleForm = ({ text, onSubmit, initialValues = {} }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: 'onChange', defaultValues: initialValues });

  const [tags, setTags] = useState(initialValues.tags || [{ id: 0, value: '' }]);

  const addTag = () => {
    setTags([...tags, { id: tags.length, value: '' }]);
  };

  const removeTag = (id) => {
    if (tags.length > 1) {
      setTags(tags.filter((tag) => tag.id !== id));
    } else {
      alert('You cannot delete the last tag.');
    }
  };

  const handleTagChange = (id, value) => {
    setTags(tags.map((tag) => (tag.id === id ? { ...tag, value } : tag)));
  };

  const handleFormSubmit = (data) => {
    onSubmit({ ...data, tags });
  };

  return (
    <form className="create" onSubmit={handleSubmit(handleFormSubmit)}>
      <h3 className="create__title">{text}</h3>
      <div className="create__inputs">
        <Input
          title="Title"
          name="Title"
          type="text"
          register={register}
          errors={errors}
          validation={articleValidation.Title}
        />
        <Input
          title="Short description"
          name="Short description"
          type="text"
          register={register}
          errors={errors}
          validation={articleValidation['Short description']}
        />
        <Input
          title="Text"
          name="Text"
          type="textarea"
          height="170px"
          register={register}
          errors={errors}
          validation={articleValidation.Text}
        />
      </div>

      <div className="create__tags tags">
        <div className="form__title tags__title">Tags</div>
        <div className="tags__content">
          <div className="tags__inputs">
            {tags.map((tag) => (
              <Controller
                key={tag.id}
                name={`tag_${tag.id}`}
                control={control}
                defaultValue={tag.value}
                render={({ field }) => (
                  <Tag
                    register={register}
                    id={tag.id}
                    errors={errors}
                    value={field.value}
                    onChange={(value) => {
                      field.onChange(value);
                      handleTagChange(tag.id, value);
                    }}
                    onDelete={() => removeTag(tag.id)}
                    isLastTag={tags.length === 1}
                  />
                )}
              />
            ))}
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={addTag}
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

export default ArticleForm;
