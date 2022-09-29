import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Marcador from "./Marcador";
import {
  GoogleMap,
  Autocomplete,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const centerOrigin = {lat: 19.2963615, lng: -98.88093980000001};

function Mapa() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ['places']
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  
  if (!isLoaded) {
    return <div>fallo</div>;
  }

  // const [lugares, setLugares] = useState([]);

  // useEffect(() => {
  //   instance.get('/eventos')
  //   .then((results) => {
  //     results.data.forEach((lugar) => {
  //         setLugares(lugar)
  //       });
  //   })
  // },[]);
  // const [valores, setValores] = useState({
  //   center: {
  //     lat: 16.946262,
  //     lng: 120.831239,
  //   },
  //   zoom: 17,
  // });

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((coordenada) => {
  //     if (coordenada) {
  //       setValores({
  //         center: {
  //           lat: coordenada.coords.latitude,
  //           lng: coordenada.coords.longitude,
  //         },
  //         zoom: 17,
  //       });
  //       return;
  //     }
  //   });
  // }, []);

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerOrigin}
        zoom={17}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {/* <Marker position={center1} /> */}
        {/* Child components, such as markers, info windows, etc. */}
        {/* {ubicaciones.map((lugar) => {
          return (
            <Marcador
              tipo={"marcBase"}
              lat={lugar.lat}
              lng={lugar.lng}
              texto={lugar.nombre}
            />
          );
        })} */}
      </GoogleMap>
      {/* <button onClick={() => map.panTo(center)}>Centrar</button> */}
      
    </div>
  );
}

export default React.memo(Mapa);
