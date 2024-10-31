import { Route, Routes } from 'react-router-dom';

import PostList from './components/PostList/PostList';
import Header from './components/Header/Header';
import PostDetail from './components/PostDetail/PostDetail';

import './styles/normalize.css';
import './App.scss';

const App = () => {
  return (
    <>
      <Header></Header>
      <Routes>
        <Route path="/" element={<PostList />}></Route>
        <Route path="/articles" element={<PostList />}></Route>
        <Route path="/articles/:slug" element={<PostDetail />} />
      </Routes>
    </>
  );
};

export default App;
