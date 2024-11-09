import { format } from 'date-fns';
import { truncateText } from '../../../shared/utils/truncateText.js';
import { cleanText } from '../../../shared/utils/cleanText.js';

import './Post.scss';

const Post = ({ article }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  const maxTagsDisplayed = 2;
  const maxTagLength = 10;

  return (
    <div className="postlist post">
      <div className="post-wrapper">
        <div className="post__content">
          <div className="post__title">
            <div className="post__title-text">
              <a href={`/articles/${article.slug}`}>{cleanText(truncateText(article.title, 50))}</a>
            </div>
            <div className="post__like">
              <div className="post__like-icon liked"></div>
              <span>{article.favoritesCount}</span>
            </div>
          </div>
          <div className="post__tags">
            {article.tagList.slice(0, maxTagsDisplayed).map((tag, index) => (
              <span key={index} className="post__tags-tag">
                {cleanText(truncateText(tag, maxTagLength))}
              </span>
            ))}
            {article.tagList.length > maxTagsDisplayed && (
              <span> + {article.tagList.length - maxTagsDisplayed} more</span>
            )}
          </div>
          <div className="post__desc">{cleanText(truncateText(article.description, 100))}</div>
        </div>
        <div className="post__author">
          <div className="post-wrapper">
            <div className="post__author-data">
              <div className="post__author-name">
                {cleanText(truncateText(article.author.username), 50)}
              </div>
              <div className="post__author-created">{formatDate(article.createdAt)}</div>
            </div>
            <div className="post__author-avatar">
              <img src={article.author.image} alt="Фото автора" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
