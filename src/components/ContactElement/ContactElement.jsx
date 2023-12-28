import { useSelector } from 'react-redux';
import svgDelete from '../../images/icons8-delete-32.png';
import iconPhoto from '../../images/icons8-contact-78.png';
import LoaderSmall from 'components/Loader/LoaderSmall';

import css from './ContactElement.module.css';

export const ContactElement = ({ id, name, number, onRemoveContact }) => {
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const error = useSelector(state => state.contactsStore.error);
  return (
    <li className={css.itemContact} key={id}>
      <div className={css.everyItem}>
        <img src={iconPhoto} alt="{iconPhoto}" width={20} height={30}></img>
        <p>{name}</p>
        <p>{number}</p>
        {isLoading && <LoaderSmall />}
        {error !== null && <>{error}</>}
        <button
          className={css.buttonDelete}
          type="button"
          name="delete"
          onClick={() => onRemoveContact(id)}
        >
          <img src={svgDelete} alt="{svgDelete}" width={30}></img>
        </button>
      </div>
    </li>
  );
};
