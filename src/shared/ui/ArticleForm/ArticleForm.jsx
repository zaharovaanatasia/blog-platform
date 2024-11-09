import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@mui/material';

import { articleValidation } from '../../utils/articleValidation';
import Input from '../Input/Input';
import Tag from '../Tag/Tag';
import './ArticleForm.scss';

const ArticleForm = ({ text, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const [tags, setTags] = useState([{ id: 0, value: '' }]);

  const addTag = () => {
    setTags([...tags, { id: tags.length, value: '' }]);
  };

  const removeTag = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
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
              <Tag
                key={tag.id}
                register={register}
                id={tag.id}
                errors={errors}
                value={tag.value}
                onChange={(value) => handleTagChange(tag.id, value)}
                onDelete={() => removeTag(tag.id)}
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
