import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

import css from './HomeRentElementPage.module.css';
import { HomeRentElement } from 'components/HomeRentElement/HomeRentElement';

const AddPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  return (
    <>
      <NavLink className={css.goBack} to={backLinkRef.current}>
        Go back
      </NavLink>
      <div className={css.container}>
        <div className={css.app}>
          <HomeRentElement className={css.containerHomeElement} />
        </div>
      </div>
    </>
  );
};
export default AddPage;
