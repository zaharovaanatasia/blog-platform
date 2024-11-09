import { Route, Routes } from 'react-router-dom';

import SignIn from './components/SingIn/SingIn';
import SingUp from './components/SingUp/SingUp';
import Header from './components/Header/Header';
import PostList from './components/posts/PostList/PostList';
import PostDetail from './components/posts/PostDetail/PostDetail';

import './styles/normalize.css';
import './App.scss';
import Edit from './components/Edit/Edit';
import Create from './components/Create/Create';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<PostList />}></Route>
        <Route path="/articles" element={<PostList />}></Route>
        <Route path="/articles/:slug" element={<PostDetail />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-un" element={<SingUp />} />
        <Route path="profile" element={<Edit />} />
        <Route path="new-article" element={<PrivateRoute />}>
          <Route path="" element={<Create />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
