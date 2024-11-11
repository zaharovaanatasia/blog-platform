import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useGetArticleBySlugQuery } from '../entities/Article/articlesApiSlice';
import Loading from '../shared/ui/Loading/Loading';

const PrivateRoute = () => {
  const user = useSelector((state) => state.auth.user);
  const { slug } = useParams();
  const { data: article, isLoading, isError } = useGetArticleBySlugQuery(slug);

  if (!slug && !user?.isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!slug) {
    return <Outlet />;
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError || !article) {
    return <div>Error loading article</div>;
  }

  const isAuthor = user.username === article.article.author.username;

  if (!isAuthor) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
