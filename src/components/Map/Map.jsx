// import React, { useRef, useState, useEffect } from 'react';
// import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
// import google from 'google';
// import { Wrapper, Status } from '@googlemaps/react-wrapper';
// // AIzaSyDCN8HpJpVmaMjrMD0HeabkH__0jWuxzGU;

// export default function MapComponent() {
//   apiKey: 'AIzaSyDCN8HpJpVmaMjrMD0HeabkH__0jWuxzGU';
//   const ref = React.useRef(null);
//   const [map, setMap] = React.useState();
//   const [clicks, setClicks] = React.useState([]);
//   const [zoom, setZoom] = React.useState(3); // initial zoom
//   const [center, setCenter] = React.useState({
//     lat: 0,
//     lng: 0,
//   });
//   const Map: React.FC<{}> = () => {};
//   const render = (status: Status) => {
//     return <h1>{status}</h1>;
//   };
//   const onClick = e => {
//     // avoid directly mutating state
//     setClicks([...clicks, e.latLng]);
//   };

//   const onIdle = m => {
//     console.log('onIdle');
//     setZoom(m.getZoom());
//     setCenter(m.getCenter().toJSON());
//   };
//   React.useEffect(() => {
//     if (ref.current && !map) {
//       setMap(new window.google.maps.Map(ref.current, {}));
//     }
//   }, [ref, map]);
//   React.useEffect(() => {
//     if (map) {
//       ['click', 'idle'].forEach(eventName =>
//         google.maps.event.clearListeners(map, eventName)
//       );
//       if (onClick) {
//         map.addListener('click', onClick);
//       }

//       if (onIdle) {
//         map.addListener('idle', () => onIdle(map));
//       }
//     }
//   }, [map, onClick, onIdle]);

//   const Marker = options => {
//     const [marker, setMarker] = React.useState();

//     React.useEffect(() => {
//       if (!marker) {
//         setMarker(new google.maps.Marker());
//       }

//       // remove marker from map on unmount
//       return () => {
//         if (marker) {
//           marker.setMap(null);
//         }
//       };
//     }, [marker]);
//     React.useEffect(() => {
//       if (marker) {
//         marker.setOptions(options);
//       }
//     }, [marker, options]);
//     return null;
//   };
//   //   <Wrapper apiKey={'AIzaSyDCN8HpJpVmaMjrMD0HeabkH__0jWuxzGU'} render={render}>
//   //     <MapComponent />
//   //   </Wrapper>;
// }
