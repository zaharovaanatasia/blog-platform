import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';

import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';
import { fetchPostSlug } from '../../api/fetchPostSlug';
import { cleanText } from '../../utils/cleanText';
import Loading from '../Loading/Loading';
import './PostDetail.scss';

const PostDetail = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const getArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPostSlug(slug);
        setArticle(data.article);
      } catch (err) {
        setError(err);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [slug]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <ErrorSnackbar
        open={snackbarOpen}
        message={error ? error.message : ''}
        onClose={handleSnackbarClose}
      />
    );

  const {
    title,
    favorited,
    favoritesCount,
    author: { image, username },
    tagList,
    description,
    createdAt,
    body,
  } = article;

  return (
    <div className="postdetail">
      <div className="post">
        <div className="post-wrapper">
          <div className="post__content">
            <div className="post__title">
              <div className="post__title-text postdetail__title-text">
                <a href={`/articles/${slug}`}>{cleanText(title)}</a>
              </div>
              <div className="post__like">
                <div className="post__like-icon liked"></div>
                <span>{favoritesCount}</span>
              </div>
            </div>
            <div className="post__tags">
              {tagList.map((tag) => (
                <span key={tag} className="post__tags-tag">
                  {cleanText(tag)}
                </span>
              ))}
            </div>
            <div className="post__desc postdetail__desc">{cleanText(description)}</div>
          </div>
          <div className="post__author">
            <div className="post-wrapper">
              <div className="post__author-data">
                <div className="post__author-name">{cleanText(username)}</div>
                <div className="post__author-created">{formatDate(createdAt)}</div>
              </div>
              <div className="post__author-avatar">
                <img src={image} alt="Фото автора" />
              </div>
            </div>
          </div>
        </div>
        <div className="postdetail__body">
          <ReactMarkdown>{cleanText(body)}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
