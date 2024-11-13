import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useGetArticleBySlugQuery, useUpdateArticleMutation } from '../../Article/articlesApiSlice';
import ArticleForm from '../../../shared/ui/ArticleForm/ArticleForm';
import Loading from '../../../shared/ui/Loading/Loading';
import './EditArticle.scss';
import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar';
import { nanoid } from 'nanoid';

const EditArticle = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data: article, isLoading, isError } = useGetArticleBySlugQuery(slug);
  const [updateArticle] = useUpdateArticleMutation();

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
      await updateArticle({ slug, ...articleData }).unwrap();
      toast.success('Article updated successfully!');
      navigate(`/articles/${slug}`);
    } catch (error) {
      toast.error('Failed to update article. Please try again.');
      console.error('Failed to update article:', error);
    }
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError || !article) {
    return <ErrorSnackbar></ErrorSnackbar>;
  }

  const initialValues = {
    Title: article.article.title,
    'Short description': article.article.description,
    Text: article.article.body,
    tags: article.article.tagList.map((tag) => ({ id: nanoid(), value: tag })),
  };

  return (
    <>
      <ArticleForm
        text="Edit Article"
        onSubmit={onSubmit}
        initialValues={initialValues}
      ></ArticleForm>
    </>
  );
};

export default EditArticle;
