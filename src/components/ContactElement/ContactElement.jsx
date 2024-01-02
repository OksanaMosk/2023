import { useSelector } from 'react-redux';
import svgDelete from '../../images/icons8-delete-32.png';
import iconPhoto from '../../images/icons8-contact-78.png';
import LoaderSmall from 'components/Loader/LoaderSmall';

import css from './ContactElement.module.css';

export const HomeElement = ({
  price,
  listResults,
  imgSrc,
  zpid,
  address,
  baths,
  beds,
  area,
  carouselPhotos,
}) => {
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const error = useSelector(state => state.contactsStore.error);
  const bath_url = 'https://photos.zillowstatic.com/fp/';
  // const second_url = imgSrc.toString.splice(34, -2);
  console.log(carouselPhotos.JSON.stringify(Array));
  return (
    <li className={css.itemContact} key={zpid}>
      <div className={css.everyItem}>
        <img
          src={bath_url + '6fbf9ebfe9e79e009236dc2edd8c3a31-p_e.jpg'}
          alt=""
          width={357}
          height={267}
        />
        <p>it is:{bath_url}</p>

        <p>{price}</p>
        <p>{address}</p>
        <p>{baths}</p>
        <p>{beds}</p>
        <p>{area}</p>
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
