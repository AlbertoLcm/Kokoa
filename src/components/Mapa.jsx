import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader, Circle } from "@react-google-maps/api";
import instance from "../api/axios";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function Mapa() {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [lugares, setLugares] = useState([]);
  const [center, setCenter] = useState({
    lat: 19.4326077,
    lng: -99.133208,
  });
  const ubicacionActual = () => {
    navigator.geolocation.getCurrentPosition((coordenada) => {
      if (coordenada) {
        setCenter({
          lat: coordenada.coords.latitude,
          lng: coordenada.coords.longitude,
        });
      }
    });
  };
  useEffect(() => {
    instance.get("/eventos").then((results) => {
      setLugares(results.data);
    });
    ubicacionActual();
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>fallo</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true,
        }}
        onLoad={(map) => setMap(map)}
      >
        {lugares.map((evento) => {
          // Obtengo la fecha y hora actual
          let today = new Date();
          let now = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
          );
          if (evento.fecha_termino < now.toISOString()) {
            return <Marker position={{ lat: evento.lat, lng: evento.lng }} />;
          }
        })}
      </GoogleMap>
      {/* <button onClick={() => map.panTo(center)}>Centrar</button> */}
    </div>
  );
}

export default React.memo(Mapa);
