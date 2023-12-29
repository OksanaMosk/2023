// import { useLocation } from 'react-router-dom';
// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Loader from 'components/Loader/Loader';

// import photo1 from 'images/icons8-phonebook-96.png';
// import photo2 from 'images/icons8-add-a-new-contact-on-modern-cell-phone-96.png';

import css from './HomePage.module.css';

const HomePage = () => {
  // const isLoadingAuth = useSelector(state => state.auth.isLoadingAuth);
  // const location = useLocation();

  return (
    <div className={css.home}>
      {/* {isLoadingAuth ? (
        <Loader />
      ) : (
        <>
          <NavLink
            className={css.homePage1}
            state={{ from: location }}
            to="/add"
          >
            <img src={photo2} alt="{photo}" width={140} height={170}></img>
          </NavLink>
          <NavLink
            className={css.homePage2}
            state={{ from: location }}
            to="/contacts"
          >
            <img src={photo1} alt="{photo}" width={170} height={170}></img>
          </NavLink>
        </>
      )} */}
    </div>
  );
};
export default HomePage;
