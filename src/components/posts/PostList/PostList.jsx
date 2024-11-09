import { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';

import ErrorSnackbar from '../../../shared/ui/ErrorSnackbar/ErrorSnackbar.jsx';
import Post from '../Post/Post.jsx';
import Loading from '../../../shared/ui/Loading/Loading.jsx';

import { useGetArticlesQuery } from '../../../redux/articlesApiSlice.js';

const PostList = () => {
  const initialPage = parseInt(localStorage.getItem('currentPage')) || 1;
  const [page, setPage] = useState(initialPage);

  const { data, error, isLoading } = useGetArticlesQuery({ page, limit: 5 });

  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

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
