import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { libraries, stylesArray } from "../../helpers/methodsMap";
import point from "../../images/point.png";
import Loading from "../loadings/Loading";

function MapNegocio() {

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
        mapContainerClassName="mapaNegocios"
        center={{
          lat: parseFloat(19.4326077),
          lng: parseFloat(-99.133208)
        }}
        zoom={15}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true
        }}
      >
        <Marker
          position={{
            lat: parseFloat(19.4326077),
            lng: parseFloat(-99.133208)
          }}
          icon={point}
        />
      </GoogleMap>
    </>
  );
}

export default MapNegocio;