import { ContactForm } from '../../components/ContactForm/ContactForm';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';

import css from './AddPage.module.css';

const AddPage = () => {
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  return (
    <>
      <NavLink className={css.goBack} to={backLinkRef.current}>
        Go back
      </NavLink>
      <div className={css.container}>
        <div>
          <ContactForm />
        </div>
      </div>
    </>
  );
};
export default AddPage;
