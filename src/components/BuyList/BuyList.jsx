import { useDispatch, useSelector } from 'react-redux';
import { fetchHome } from 'redux/buy/buy.reducer';

import { selectBuy } from 'redux/buy/buy.selector';
// import { selectFilterTerm } from 'redux/filter/filter.selector';
import { useEffect } from 'react';

import iconBath from '../images/iconBath.png';
import iconBed from '../images/iconBed.png';
import iconSizeFt from '../images/iconSizeFt.png';
import iconSizeM from '../images/iconSizeM.png';
import { NavLink } from 'react-router-dom';
// import { CurrentLocationMarker } from '../CurrentLocationMarker';

import css from './BuyList.module.css';

export const BuyList = ({ setSelectedMarker }) => {
  const listResults = useSelector(selectBuy);
  // const zpid = useParams();

  const error = useSelector(state => state.buyStore.error);
  // const filterTerm = useSelector(selectFilterTerm);

  const dispatch = useDispatch();

  console.log('listResults', listResults);

  useEffect(() => {
    dispatch(fetchHome());
  }, [dispatch]);

  return (
    listResults.imgSrc !== null && (
      <div className={css.homeContainer}>
        <ul className={css.homeList}>
          {listResults.map(result => (
            <li className={css.itemHome} key={result.zpid}>
              <div className={css.everyItem}>
                {result.imgSrc && (
                  <img
                    className={css.everyItemImg}
                    src={result.imgSrc}
                    alt={`House ${result.zpid}`}
                  />
                )}
                <div className={css.about}>
                  <p className={css.price}>{result.price.toLocaleString()}</p>
                  <p
                    className={css.address}
                    style={{
                      whiteSpace: 'pre-wrap',
                      maxWidth: '25ch',
                      overflowWrap: 'break-word',
                    }}
                  >
                    {result.address.replace(/,([^,]{0,10})$/, ',\u00A0$1')}
                  </p>
                  <div className={css.aboutDetails}>
                    <p>
                      <img className={css.icon} src={iconBath} alt="iconBath" />
                      {result.baths}
                    </p>
                    <p>
                      <img className={css.icon} src={iconBed} alt="iconBed" />
                      {result.beds}
                    </p>
                    <p>
                      <img
                        className={css.icon}
                        src={iconSizeFt}
                        alt="iconSizeFt"
                      />
                      {result.area} sqft
                    </p>
                    <p>
                      <img
                        className={css.icon}
                        src={iconSizeM}
                        alt="iconSizeM"
                      />
                      {(result.area / 10.7638).toFixed(2)} m²
                    </p>
                  </div>
                  <NavLink
                    className={css.toHomeElement}
                    key={result.id}
                    to={`/buy/${result.id}`}
                    onClick={() => setSelectedMarker(result)}
                  >
                    View details
                  </NavLink>
                </div>

                {error !== null && <>{error}</>}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
