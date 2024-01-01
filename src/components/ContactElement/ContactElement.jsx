import { useSelector } from 'react-redux';
import svgDelete from '../../images/icons8-delete-32.png';
import iconPhoto from '../../images/icons8-contact-78.png';
import LoaderSmall from 'components/Loader/LoaderSmall';

import css from './ContactElement.module.css';

export const HomeElement = ({ price, imgSrc, zpid, address }) => {
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const error = useSelector(state => state.contactsStore.error);
  return (
    <li className={css.itemContact} key={zpid}>
      <div className={css.everyItem}>
        {/* <img src={imgSrc} alt="{iconPhoto}" width={300} height={300}></img> */}

        <p>{price}</p>
        <p>{address}</p>
        {isLoading && <LoaderSmall />}
        {error !== null && <>{error}</>}
        {/* <button
          className={css.buttonDelete}
          type="button"
          name="delete"
          // onClick={() => onRemoveContact(zpid)}
        >
          <img src={svgDelete} alt="{svgDelete}" width={30}></img>
        </button> */}
      </div>
    </li>
  );
};
