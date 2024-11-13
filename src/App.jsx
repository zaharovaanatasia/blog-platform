import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import SignIn from './features/Auth/SignIn/SignIn';
import SignUp from './features/Auth/SignUp/SignUp';

import Header from './widgets/Header/Header';
import PrivateRoute from './widgets/PrivateRoute';

import ArticleList from './entities/Article/ArticleList/ArticleList';
import ArticleDetail from './entities/Article/ArticleDetail/ArticleDetail';
import EditArticle from './entities/Article/EditArticle/EditArticle';
import Create from './entities/Article/Create/Create';

import Edit from './entities/User/Edit/Edit';

import 'react-toastify/dist/ReactToastify.css';
import './styles/normalize.css';
import './App.scss';

const App = () => {
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
