import React from "react";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function Mapa({ mapSet }) {
  const { addEventos, mostrar } = useAuth();
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [lugares, setLugares] = useState([]);
  const [centerMy, setCenterMy] = useState({
    lat: 19.4326077,
    lng: -99.133208,
  });
  const ubicacionActual = () => {
    navigator.geolocation.getCurrentPosition((coordenada) => {
      if (coordenada) {
        setCenterMy({
          lat: parseFloat(coordenada.coords.latitude),
          lng: parseFloat(coordenada.coords.longitude),
        });
      }
    });
  };
  const rango = [];
  useEffect(() => {
    instance.get("/eventos").then((results) => {
      setLugares(results.data);
    });
    ubicacionActual();
  }, [mostrar]);

  useEffect(() => {
    addEventos(rango);
  }, [lugares, mostrar]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>fallo</div>;
  }
  // eslint-disable-next-line no-undef
  const circle = new google.maps.Circle({
    map: map,
    center: centerMy,
    radius: 4000,
    strokeColor: "#FF0099",
    strokeOpacity: 1,
    strokeWeight: 2,
    fillColor: "#009ee0",
    fillOpacity: 0.2,
  });

  lugares.map((evento) => {
    if (circle.getBounds().contains({ lat: evento.lat, lng: evento.lng })) {
      rango.push({
        evento: evento.nombre,
        ubicacion: evento.ubicacion,
        lat: evento.lat,
        lng: evento.lng,
      });
    }
  });

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerMy}
        zoom={17}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true,
        }}
        onLoad={(map) => {
          mapSet(map);
        }}
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

          // if (evento.fecha_termino < now.toISOString()) {
          return <Marker position={{ lat: evento.lat, lng: evento.lng }} />;
          // }
        })}
      </GoogleMap>
    </div>
  );
}

export default React.memo(Mapa);
