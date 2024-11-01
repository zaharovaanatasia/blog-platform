import { format } from 'date-fns';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useGetArticleBySlugQuery } from '../../redux/apiSlice.js';
import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar';
import { cleanText } from '../../utils/cleanText';
import Loading from '../Loading/Loading';
import './PostDetail.scss';

const PostDetail = () => {
  const { slug } = useParams();
  const { data, error, isLoading } = useGetArticleBySlugQuery(slug);

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

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
