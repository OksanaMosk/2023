import { Marker } from '@react-google-maps/api';
import iconMap from '../images/locationMap.png';

export const CurrentLocationMarker = ({ position, onClick, zpid }) => {
  return (
    <Marker
      position={position}
      icon={iconMap}
      onClick={() => {
        console.log('Clicked zpid:', zpid);
        onClick(zpid);
      }}
    />
  );
};
