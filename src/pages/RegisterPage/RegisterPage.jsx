import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useRef } from 'react';
import book2 from 'images/icons8-add-a-new-contact-on-modern-cell-phone-96.png';
import { registerThunk } from 'redux/auth/auth.reducer';
import Loader from 'components/Loader/Loader';
import { useSelector } from 'react-redux';
import Notiflix from 'notiflix';

import css from './RegisterPage.module.css';

const Register = () => {
  const isLoadingAuth = useSelector(state => state.auth.isLoadingAuth);
  const location = useLocation();
  const backLinkRef = useRef('/');
  const dispatch = useDispatch();
  const onSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = {
      name: form.elements.userName.value,
      email: form.elements.userEmail.value,
      password: form.elements.userPassword.value,
    };
    dispatch(registerThunk(formData))
      .unwrap()
      .then(newRegister => {
        Notiflix.Notify.success(` Welcome ${newRegister.user.name} !`);
      })
      .catch(() => {
        Notiflix.Notify.failure(
          'Something went wrong... Maybe the user be registered'
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
      <div className={css.register}>
        <form className={css.form} onSubmit={onSubmit}>
          <label>
            <p className={css.inputName}>Name</p>
            <input
              type="text"
              name="userName"
              className={css.formInput}
              placeholder="Name"
              required
            ></input>
          </label>
          <label>
            <p className={css.inputName}>Email</p>
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              className={css.formInput}
              required
            ></input>
          </label>
          <label>
            <p className={css.inputName}>Password</p>
            <input
              type="password"
              name="userPassword"
              className={css.formInput}
              placeholder="Password"
              required
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
export default Register;
