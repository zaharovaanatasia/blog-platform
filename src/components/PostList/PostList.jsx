import { useState } from 'react';
import Pagination from '@mui/material/Pagination';

import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar.jsx';
import Post from './Post/Post';
import Loading from '../Loading/Loading.jsx';

import { useGetArticlesQuery } from '../../redux/apiSlice.js';

const PostList = () => {
  const [page, setPage] = useState(1);

  const { data, error, isLoading } = useGetArticlesQuery({ page, limit: 5 });

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorSnackbar open={true} message={error.error || 'Неизвестная ошибка'} />;
  }

  return (
    <div className="postlist">
      {data.articles.map((article) => (
        <Post key={article.slug} article={article} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={Math.ceil(data.articlesCount / 5)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};

export default PostList;
