import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { libraries, stylesArray } from "../../helpers/methodsMap";
import point from "../../images/point.png";
import Loading from "../loadings/Loading";

function MapNegocio({ mapSet, map }) {

  const [center, setCenter] = useState({ lat: 19.4326077, lng: -99.133208 });
  
  useEffect(() => {    
    navigator.geolocation.getCurrentPosition((coordenada) => {
      if (coordenada) {
        setCenter({
          lat: parseFloat(coordenada.coords.latitude),
          lng: parseFloat(coordenada.coords.longitude)
        });
      }
    });
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries,
  });
  if (!isLoaded) {
    return <Loading />;
  }

  

  return (
    <>
      <GoogleMap
        mapContainerClassName= "mapaNegocios"
        center={center}
        zoom={15}
        onLoad={(map) => mapSet(map)}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true
        }} 
        >
        <Marker 
        position={center}
        icon={point}
        />
        </GoogleMap>
    </>
  );
}

export default MapNegocio;