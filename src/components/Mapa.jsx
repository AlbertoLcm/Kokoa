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
import instance from "../api/axios";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const centerOrigin = {lat: 19.2963615, lng: -98.88093980000001};

function Mapa() {
  const [lugares, setLugares] = useState([]);
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  useEffect(() => {
    instance.get('/eventos')
    .then((results) => {
      // console.log(results.data)
      setLugares(results.data)
    })
  },[]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ['places']
  });

  if (!isLoaded) {
    return <div>fallo</div>;
  }

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

  console.log(lugares)
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
        {lugares.map((evento) => {
          return (
            <Marker position={{lat: evento.lat, lng: evento.lng}} />
          );
        })} 
        
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
