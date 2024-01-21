import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';

import css from './Autocomplete.module.css';
import { useEffect } from 'react';

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
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }) =>
    () => {
      // When the user selects a place, we can replace the keyword without request data from API
      // by setting the second parameter to "false"
      setValue(description, false);
      clearSuggestions();
      console.log(description);

      getGeocode({ address: description })
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => {
          console.log('📍 Coordinates: ', { lat, lng });
          onSelect({ lat, lng });
        })
        .catch(error => {
          console.log('Error: ', error);
        });
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
          onClick={handleSelect(suggestion)}
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
