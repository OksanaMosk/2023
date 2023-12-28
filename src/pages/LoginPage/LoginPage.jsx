import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { loginThunk } from 'redux/auth/auth.reducer';
import { useRef } from 'react';

import Notiflix from 'notiflix';
import book2 from 'images/icons8-add-a-new-contact-on-modern-cell-phone-96.png';
import Loader from 'components/Loader/Loader';
import css from './LoginPage.module.css';

const Login = () => {
  const isLoadingAuth = useSelector(state => state.auth.isLoadingAuth);
  const location = useLocation();
  const dispatch = useDispatch();
  const backLinkRef = useRef('/');

  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = {
      email: form.elements.userEmail.value,
      password: form.elements.userPassword.value,
    };

    dispatch(loginThunk(formData))
      .unwrap()
      .then(newUser => {
        Notiflix.Notify.success(` Welcome ${newUser.user.name} !`);
      })
      .catch(() => {
        Notiflix.Notify.failure(
          'Something went wrong...Incorrect login or password'
        );
      });

    form.reset();
  };

  return (
    <>
      <NavLink
        state={{ from: location }}
        className={css.goBack}
        to={backLinkRef.current}
      >
        Go Home
      </NavLink>
      <div className={css.login}>
        <form className={css.form} onSubmit={onSubmit}>
          <label>
            <p className={css.inputName}>Email</p>
            <input
              type="email"
              placeholder="Email"
              className={css.formInput}
              required
              name="userEmail"
            ></input>
          </label>
          <label>
            <p className={css.inputName}>Password</p>
            <input
              type="password"
              className={css.formInput}
              placeholder="********"
              required
              name="userPassword"
              minLength={7}
            ></input>
          </label>
          <button type="submit" className={css.submitButton}>
            {isLoadingAuth ? (
              <Loader />
            ) : (
              <img
                src={book2}
                alt="{book2}"
                className={css.book_2}
                width={100}
                height={100}
              ></img>
            )}
          </button>
        </form>
      </div>
    </>
  );
};
export default Login;
