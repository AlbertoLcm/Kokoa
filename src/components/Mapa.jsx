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

  const options = {
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
    clickable: false,
    draggable: false,
    editable: false,
    visible: true,
    radius: 3000,
    zIndex: 1,
  };

  const onLoad = (circle) => {
    console.log("Circle onLoad circle: ", circle);
  };

  const onUnmount = (circle) => {
    console.log("Circle onUnmount circle: ", circle);
  };

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
        <Circle
          // optional
          onLoad={onLoad}
          // optional
          onUnmount={onUnmount}
          // required
          center={center}
          // required
          options={options}
        />;
      </GoogleMap>
      {/* <button onClick={() => map.panTo(center)}>Centrar</button> */}
    </div>
  );
}

export default React.memo(Mapa);
