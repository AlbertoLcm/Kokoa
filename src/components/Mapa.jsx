import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
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

  console.log(lugares);
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
          center: true
        }}
        onLoad={(map) => setMap(map)}
      >
        {lugares.map((evento) => {
          let termino = new Date(evento.fecha_termino);
          // Obtengo el tiempo actual
          let today = new Date();
          let now = today.toLocaleString();

          if(termino.valueOf() < today.valueOf()){
            return <Marker position={{ lat: evento.lat, lng: evento.lng }} />;
          }

        
        })}
      </GoogleMap>
      {/* <button onClick={() => map.panTo(center)}>Centrar</button> */}
    </div>
  );
}

export default React.memo(Mapa);
