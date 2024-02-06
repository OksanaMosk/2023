import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import { fetchHome } from 'redux/buy/buy.reducer';
// import axios from 'axios';

import css from './Autocomplete.module.css';

export const Autocomplete = ({ isLoaded, onSelect }) => {
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

  const handleInput = e => {
    setValue(e.target.value);
  };

  const handleSelect = async ({ description }) => {
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
      console.log('City Coordinates:', cityCoordinates);
      const data = await fetchHome(cityCoordinates);
      console.log('Fetched Data: ', data);
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
      console.log('Suggestion:', suggestion);

      return (
        <li
          className={css.listItem}
          key={place_id}
          onClick={() => handleSelect(suggestion)}
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
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?"
      ></input>

      {status === 'OK' && (
        <ul className={css.suggestions}>{renderSuggestions()}</ul>
      )}
    </div>
  );
};
