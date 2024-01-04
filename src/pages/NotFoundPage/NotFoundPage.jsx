import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';

import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  const location = useLocation();
  const backLinkRef = useRef('/');
  return (
    <div>
      <NavLink
        state={{ from: location }}
        className={css.goBack}
        to={backLinkRef.current}
      >
        Go Home
      </NavLink>
      <h2 className={css.errorMainTitle}>Opssss...Error...</h2>
      <div className={css.errorAbout}></div>
    </div>
  );
};
export default NotFoundPage;
