import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { libraries, stylesArray } from "../../helpers/methodsMap";
import point from "../../images/point.png";
import Loading from "../loadings/Loading";

function MapNegocio(coordenadas = {}) {
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
        center={coordenadas.coordenadas}
        zoom={15}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker
          position={coordenadas.coordenadas}
          icon={point}
        />
      </GoogleMap>
    </>
  );
}

export default MapNegocio;