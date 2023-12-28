import { useDispatch, useSelector } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { selectAuthenticated } from 'redux/auth/auth.selectors';
import { selectUserData } from 'redux/auth/auth.selectors';
import { logOutThunk } from 'redux/auth/auth.reducer';

import css from './Layout.module.css';

const Layout = ({ children }) => {
  const userData = useSelector(selectUserData);
  const location = useLocation();
  const dispatsh = useDispatch();
  const authenticated = useSelector(selectAuthenticated);

  const onLogOut = () => {
    dispatsh(logOutThunk());
  };

  return (
    <div>
      <header>
        <h1 className={css.mainTitle}>Phonebook</h1>
        {authenticated ? (
          <>
            <div className={css.menu}>
              <NavLink state={{ from: location }} to="/"></NavLink>

              <NavLink
                state={{ from: location }}
                className={css.title}
                to="/add"
              >
                Add contact
              </NavLink>
              <NavLink
                state={{ from: location }}
                className={css.title}
                to="/contacts"
              >
                My contacts
              </NavLink>
            </div>
            <span className={css.nameLogOutButton}>Hello, {userData.name}</span>
            <button className={css.logOutButton} onClick={onLogOut}>
              Log out
            </button>
          </>
        ) : (
          <div className={css.authorization}>
            <NavLink
              state={{ from: location }}
              className={css.titleAuthorization}
              to="/register"
            >
              Register
            </NavLink>
            <NavLink
              state={{ from: location }}
              className={css.titleAuthorization}
              to="/login"
            >
              Login
            </NavLink>
          </div>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
};
export default Layout;
