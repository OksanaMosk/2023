import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { fetchHome } from 'redux/buy/buy.reducer';
import citiesData from '../BuyList/sity';

import css from './Autocomplete.module.css';

export const Autocomplete = ({ isLoaded, onSelect }) => {
  const [formattedValue, setFormattedValue] = useState('');
  const dispatch = useDispatch();

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    init,
    clearSuggestions,
  } = usePlacesAutocomplete({
    initOnMount: false,
    debounce: 300,
  });

  const ref = useOnclickOutside(() => {
    clearSuggestions();
  });

  const someFunctionToFormatValue = description => {
    if (typeof description === 'string' && description.trim() !== '') {
      return description.toLowerCase().replace(/\s+/g, '-');
    }
  };

  const handleInput = description => {
    if (typeof description === 'string') {
      setValue(description);

      const formatted = someFunctionToFormatValue(description);
      setFormattedValue(formatted);
    } else {
      console.error('Input is not a string:', description);
    }
  };

  const findCityData = description => {
    const cityData = citiesData.find(
      city => city.RegionName.toLowerCase() === description.toLowerCase()
    );

    if (cityData) {
      return {
        State: cityData.State,
        RegionID: cityData.RegionID,
      };
    }

    return null;
  };

  const handleSelect = async description => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      console.log('📍 Coordinates: ', { lat, lng });
      onSelect({ lat, lng });

      const cityCoordinates = {
        north: lat + 1,
        south: lat - 1,
        east: lng + 1,
        west: lng - 1,
      };

      const cityData = findCityData(description); // Знаходимо дані міста з sity.json

      if (cityData) {
        const { State, RegionID } = cityData;
        if (!cityCoordinates || !State || !RegionID) {
          console.error('Some properties are empty or undefined!');
          return;
        }

        const formattedValue = someFunctionToFormatValue(description);

        dispatch(
          fetchHome({
            cityCoordinates,
            formattedValue,
            State,
            RegionID,
          })
        );
      } else {
        console.log('City not found in sity.json');
      }
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className={css.listItem}
          key={place_id}
          onClick={() => handleSelect(main_text)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  React.useEffect(() => {
    if (isLoaded) {
      init();
    }
  }, [isLoaded, init]);

  return (
    <div className={css.root} ref={ref}>
      <input
        type="text"
        className={css.input}
        value={value}
        onChange={e => handleInput(e.target.value)}
        disabled={!ready}
        placeholder="Where are you going?"
      ></input>

      {status === 'OK' && (
        <ul className={css.suggestions}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};
