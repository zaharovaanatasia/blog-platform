import { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';

import ErrorSnackbar from '../ErrorSnackbar/ErrorSnackbar.jsx';
import { fetchArticles } from '../../api/fetchPost.js';
import Post from './Post/Post';
import Loading from '../Loading/Loading.jsx';

const PostList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    const getArticles = async () => {
      setLoading(true);
      try {
        const data = await fetchArticles(page, 5);
        setArticles(data.articles);
        setTotalPages(Math.ceil(data.articlesCount / 10));
      } catch (err) {
        setError(err);
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return <Loading></Loading>;
  }

  if (error)
    return (
      <ErrorSnackbar
        open={snackbarOpen}
        message={error ? error.message : ''}
        onClose={handleSnackbarClose}
      />
    );

  return (
    <div className="postlist">
      {articles.map((article) => (
        <Post key={article.slug} article={article} />
      ))}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <Pagination
          count={totalPages}
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
