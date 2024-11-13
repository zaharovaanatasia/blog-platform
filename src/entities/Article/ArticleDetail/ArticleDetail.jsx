import { format } from 'date-fns';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';

import {
  useGetArticleBySlugQuery,
  useDeleteArticleMutation,
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from '../../../entities/Article/articlesApiSlice.js';

import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar.jsx';
import { cleanText } from '../../../shared/utils/cleanText.js';
import Loading from '../../../shared/ui/Loading/Loading.jsx';
import './ArticleDetail.scss';
import { Popconfirm } from 'antd';

const ArticleDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading, refetch } = useGetArticleBySlugQuery(slug);
  const currentUser = useSelector((state) => state.auth.user);
  const [deleteArticle, { isLoading: isDeleting }] = useDeleteArticleMutation();
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const token = useSelector((state) => state.auth.user.token);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  useEffect(() => {
    refetch();
  }, [slug, refetch]);

  if (isLoading) return <Loading />;

  if (error) {
    return (
      <div className="postdetail">
        <ErrorSnackbar open={true} message={error.error || 'Неизвестная ошибка'} />
      </div>
    );
  }

  const {
    title,
    favorited,
    favoritesCount,
    author: { image, username },
    tagList,
    description,
    createdAt,
    body,
  } = data.article;

  const tagListArray = Array.isArray(tagList) ? tagList : [];

  const handleEditClick = () => {
    navigate(`/articles/${slug}/edit`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteArticle(slug).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to delete article', error);
    }
  };

  const handleLikeClick = async () => {
    if (!token) {
      navigate('/sign-in');
      return;
    }

    try {
      if (favorited) {
        await unlikeArticle(slug).unwrap();
      } else {
        await likeArticle(slug).unwrap();
      }
      refetch();
    } catch (error) {
      console.error('Failed to like/unlike article', error);
    }
  };



  return (
    <div className="postdetail">
      <div className="post">
        <div className="post-wrapper">
          <div className="post__content">
            <div className="post__title">
              <div className="post__title-text postdetail__title-text">
                <a href={`/articles/${slug}`}>{cleanText(title)}</a>
              </div>
              <div className="post__like" onClick={handleLikeClick}>
                <div className={`post__like-icon ${favorited ? 'liked' : ''}`}></div>
                <span>{favoritesCount}</span>
              </div>
            </div>
            <div className="post__tags">
              {tagListArray.map((tag) => (
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

            {currentUser.username === username && (
              <div className="btns">
                <Popconfirm
                  title="Are you sure to delete this article?"
                  onConfirm={handleDeleteClick}
                  okText="Yes"
                  cancelText="No"
                  placement="rightBottom"
                >
                  <Button variant="outlined" color="error" disabled={isDeleting}>
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </Button>
                </Popconfirm>

                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleEditClick}
                  sx={{ color: '#52c41a', borderColor: '#52c41a' }}
                >
                  edit
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="postdetail__body">
          <ReactMarkdown>{body}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
