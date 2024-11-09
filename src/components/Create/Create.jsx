import { useNavigate } from 'react-router-dom';
import { useCreateArticleMutation } from '../../redux/articlesApiSlice';

import ArticleForm from '../../shared/ui/ArticleForm/ArticleForm';
import './Create.scss';

const Create = () => {
  const navigate = useNavigate();
  const [createArticle] = useCreateArticleMutation();

  const onSubmit = async (data) => {
    console.log('Data before sending:', data);
    const articleData = {
      article: {
        title: data.Title,
        description: data['Short description'],
        body: data.Text,
        tagList: data.tags.map((tag) => tag.value).filter(Boolean),
      },
    };

    console.log('Article data:', articleData);

    try {
      await createArticle(articleData).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to create article:', error);
    }
  };

  return (
    <>
      <ArticleForm text="Create New Article" onSubmit={onSubmit}></ArticleForm>
    </>
  );
};

export default Create;
