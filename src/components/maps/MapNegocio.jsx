import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { libraries, stylesArray } from "../../helpers/methodsMap";

function MapNegocio() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries,
  });
  if (!isLoaded) {
    return <div>fallo</div>;
  }

  return (
    <>
      <GoogleMap
        mapContainerClassName="mapaNegocios"
        center={{ lat: 19.4326077, lng: -99.133208 }}
        zoom={15}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true
        }}>

        </GoogleMap>

    </>
  );
}

export default MapNegocio;