import { Button } from '@mui/material';

import { articleValidation } from '../../utils/articleValidation';

import Input from '../Input/Input';
import './Tag.scss';

const Tag = ({ register, errors, id, value, onDelete, isLastTag }) => {
  return (
    <div className="tags__item">
      <Input
        title=" "
        name={`tag_${id}`}
        type="text"
        register={register}
        errors={errors}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        validation={articleValidation.tags}
      ></Input>
      <Button
        variant="outlined"
        color="error"
        onClick={onDelete}
        sx={{ width: 120, height: 42 }}
        disabled={isLastTag}
      >
        Delete
      </Button>
    </div>
  );
};

export default Tag;
