import { useSelector } from 'react-redux';

import LoaderSmall from 'components/Loader/LoaderSmall';

import css from './ContactElement.module.css';

export const HomeElement = ({
  price,
  listResults,
  imgSrc,
  hdpData,
  zpid,
  address,
  baths,
  beds,
  area,
  id,
  detailUrl,
}) => {
  const isLoading = useSelector(state => state.contactsStore.isLoading);
  const error = useSelector(state => state.contactsStore.error);

  return {
    /* <button
          className={css.buttonDelete}
          type="button"
          name="delete"
          // onClick={() => onRemoveContact(zpid)}
        >
          <img src={svgDelete} alt="{svgDelete}" width={30}></img>
        </button> */
  };
};
