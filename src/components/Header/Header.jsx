import './Header.scss';

const Header = () => {
  return (
    <div className="header">
      <div className="header__container">
        <div className="header__logo">Realworld Blog</div>
        <div className="header__sign">
          <button className="header__sign-in">Sign In</button>
          <button className="header__sign-up">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
