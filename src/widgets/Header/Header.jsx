import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logout } from '../../features/Auth/authSlice';

import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="header">
      <div className="header__container">
        <NavLink to="/" className="header__logo">
          Realworld Blog
        </NavLink>

        {user.isAuthenticated ? (
          <div className="header__auth">
            <NavLink to="/new-article" className="header__auth-create">
              Create article
            </NavLink>

            <NavLink to={'profile'} className="header__auth-user">
              <span>{user.username}</span>
              <div className="image">
                <img src={user.image || '../../assets/img'} alt="User avatar" />
              </div>
            </NavLink>

            <div className="header__auth-logout" onClick={handleLogout}>
              Log out
            </div>
          </div>
        ) : (
          <div className="header__sign">
            <NavLink
              to="/sign-in"
              className={({ isActive }) =>
                isActive ? 'header__sign-in active' : 'header__sign-in'
              }
            >
              Sign In
            </NavLink>
            <NavLink
              to="/sign-un"
              className={({ isActive }) =>
                isActive ? 'header__sign-up active' : 'header__sign-up'
              }
            >
              Sign Up
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
