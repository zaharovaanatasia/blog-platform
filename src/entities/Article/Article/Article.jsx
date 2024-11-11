import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import { truncateText } from '../../../shared/utils/truncateText.js';
import { cleanText } from '../../../shared/utils/cleanText.js';

import {
  useLikeArticleMutation,
  useUnlikeArticleMutation,
} from '../../../entities/Article/articlesApiSlice.js';

import './Article.scss';

const Article = ({ article: initialArticle }) => {
  const navigate = useNavigate();
  const [likeArticle] = useLikeArticleMutation();
  const [unlikeArticle] = useUnlikeArticleMutation();
  const token = useSelector((state) => state.auth.user.token);
  const [article, setArticle] = useState(initialArticle);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  const maxTagsDisplayed = 2;
  const maxTagLength = 10;

  const tagList = Array.isArray(article?.tagList) ? article.tagList : [];
  const title = article?.title || 'No Title';
  const description = article?.description || 'No Description';
  const authorUsername = article?.author?.username || 'Unknown Author';
  const authorImage = article?.author?.image || <img src="../../../assets/img" />;
  const createdAt = article?.createdAt || new Date().toISOString();
  const favoritesCount = article?.favoritesCount || 0;
  const slug = article?.slug || 'default-slug';

  const handleLikeClick = async () => {
    if (!token) {
      console.log('Token:', token);
      navigate('/sign-in');
      return;
    }

    try {
      if (article.favorited) {
        await unlikeArticle(slug).unwrap();
        setArticle({
          ...article,
          favorited: false,
          favoritesCount: article.favoritesCount - 1,
        });
      } else {
        await likeArticle(slug).unwrap();
        setArticle({
          ...article,
          favorited: true,
          favoritesCount: article.favoritesCount + 1,
        });
      }
    } catch (error) {
      console.error('Failed to like/unlike article', error);
    }
  };

  return (
    <div className="postlist post">
      <div className="post-wrapper">
        <div className="post__content">
          <div className="post__title">
            <div className="post__title-text">
              <a href={`/articles/${slug}`}>{cleanText(truncateText(title, 50))}</a>
            </div>
            <div className="post__like" onClick={handleLikeClick}>
              <div className={`post__like-icon ${article.favorited ? 'liked' : ''}`}></div>
              <span>{favoritesCount}</span>
            </div>
          </div>
          <div className="post__tags">
            {tagList.slice(0, maxTagsDisplayed).map((tag, id) => {
              const cleanTag = tag ? cleanText(truncateText(tag, maxTagLength)) : 'No Tag';
              return (
                <span key={id} className="post__tags-tag">
                  {cleanTag}
                </span>
              );
            })}
            {tagList.length > maxTagsDisplayed && (
              <span> + {tagList.length - maxTagsDisplayed} more</span>
            )}
          </div>
          <div className="post__desc">{cleanText(truncateText(description, 100))}</div>
        </div>
        <div className="post__author">
          <div className="post-wrapper">
            <div className="post__author-data">
              <div className="post__author-name">{cleanText(truncateText(authorUsername), 50)}</div>
              <div className="post__author-created">{formatDate(createdAt)}</div>
            </div>
            <div className="post__author-avatar">
              <img src={authorImage} alt="Фото автора" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Article;
