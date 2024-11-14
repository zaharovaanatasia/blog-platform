import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/Auth/authSlice';

import SignIn from './features/Auth/SignIn/SignIn';
import SignUp from './features/Auth/SignUp/SignUp';

import Header from './widgets/Header/Header';
import PrivateRoute from './widgets/PrivateRoute';

import ArticleList from './entities/Article/ArticleList/ArticleList';
import ArticleDetail from './entities/Article/ArticleDetail/ArticleDetail';
import EditArticle from './features/EditArticle/EditArticle';
import Create from './entities/Article/Create/Create';

import Edit from './entities/User/Edit/Edit';

import 'react-toastify/dist/ReactToastify.css';
import './styles/normalize.css';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser?.token) {
      dispatch(login(storedUser));
    }
  }, [dispatch]);

  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<ArticleList />}></Route>
        <Route path="/articles" element={<ArticleList />}></Route>
        <Route path="/articles/:slug" element={<ArticleDetail />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Edit />} />
        <Route path="/new-article" element={<PrivateRoute />}>
          <Route path="" element={<Create />} />
        </Route>
        <Route path="/articles/:slug/edit" element={<PrivateRoute />}>
          <Route path="" element={<EditArticle />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
