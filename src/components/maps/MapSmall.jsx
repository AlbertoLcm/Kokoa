import React from "react";
import { stylesArray, libraries } from "../../helpers/methodsMap";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import marker from "../../images/marker.png";
import Loading from "../Loading";

function MapSmall({ evento }) {
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
        mapContainerClassName="mapaSmall"
        center={evento}
        zoom={15}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true
        }}
        icon={marker}>

        <Marker 
        position={evento}
        icon={marker}
        />

        </GoogleMap>
    </>
  );
}

export default MapSmall;