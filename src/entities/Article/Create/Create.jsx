import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCreateArticleMutation } from '../../../entities/Article/articlesApiSlice.js';
import ArticleForm from '../../../shared/ui/ArticleForm/ArticleForm';
import './Create.scss';

const Create = () => {
  const navigate = useNavigate();
  const [createArticle] = useCreateArticleMutation();

  const onSubmit = async (data) => {
    const articleData = {
      article: {
        title: data.Title,
        description: data['Short description'],
        body: data.Text,
        tagList: data.tags.map((tag) => tag.value).filter(Boolean),
      },
    };
    try {
      await createArticle(articleData).unwrap();
      navigate('/');
      toast.success('Article created successfully!');
    } catch (error) {
      console.error('Failed to create article:', error);
      toast.error('Failed to create article!');
    }
  };

  return (
    <>
      <ArticleForm
        text="Create New Article"
        onSubmit={onSubmit}
        initialValues={{
          Title: '',
          'Short description': '',
          Text: '',
          tags: [{ value: '' }],
        }}
      />
    </>
  );
};

export default Create;
