import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import classNames from 'classnames';

import { logout } from '../../features/Auth/authSlice';

import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, username, image } = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/');
  };

  const renderAuthLinks = () => (
    <div className="header__auth">
      <NavLink to="/new-article" className="header__auth-create">
        Create article
      </NavLink>

      <NavLink to="/profile" className="header__auth-user">
        <span>{username}</span>
        <div className="image">
          <img
            src={image || 'https://static.productionready.io/images/smiley-cyrus.jpg'}
            alt="User avatar"
          />
        </div>
      </NavLink>

      <div className="header__auth-logout" onClick={handleLogout}>
        Log out
      </div>
    </div>
  );

  const renderSignLinks = () => (
    <div className="header__sign">
      <NavLink
        to="/sign-in"
        className={({ isActive }) => classNames('header__sign-in', { active: isActive })}
      >
        Sign In
      </NavLink>
      <NavLink
        to="/sign-up"
        className={({ isActive }) => classNames('header__sign-up', { active: isActive })}
      >
        Sign Up
      </NavLink>
    </div>
  );

  return (
    <div className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          Realworld Blog
        </NavLink>

        {isAuthenticated ? renderAuthLinks() : renderSignLinks()}
      </div>
    </div>
  );
};

export default Header;
