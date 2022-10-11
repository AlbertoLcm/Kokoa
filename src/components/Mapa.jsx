import React from "react";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader
} from "@react-google-maps/api";
import Modal from "./Modal";
import stylesArray from "../helpers/stylesArray";


const containerStyle = {
  width: "100%",
  height: "100vh",
};

function Mapa({ mapSet }) {
  const { addEventos, mostrar } = useAuth();
  const [activeMarker, setActiveMarker] = useState(null);
  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [lugares, setLugares] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [eventoInfo, setEventoInfo] = useState({});
  const [centerMy, setCenterMy] = useState();

  const ubicacionActual = () => {
    navigator.geolocation.getCurrentPosition((coordenada) => {
      if (coordenada) {
        setCenterMy({
          lat: parseFloat(coordenada.coords.latitude),
          lng: parseFloat(coordenada.coords.longitude),
        });
      } else {
        setCenterMy({
          lat: 19.4326077,
          lng: -99.133208,
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
  }, [mostrar,]);

  useEffect(() => {
    addEventos(rango);
  }, [lugares, mostrar, centerMy,]);

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

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

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

  const asignacion = (id) => {
    setShowModal(!showModal);
    const eve = lugares.find((evento) => evento.id === id);
    setEventoInfo(eve);
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={centerMy}
        zoom={16}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true,
        }}
        onLoad={(map) => {
          mapSet(map);
        }}
        clickableIcons={false}
        onClick={() => setActiveMarker(null)}
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
          return (
            <Marker
              key={evento.id}
              position={{ lat: evento.lat, lng: evento.lng }}
              onClick={() => handleActiveMarker(evento.id)}>
              {activeMarker === evento.id && (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div className="markerInfo">
                    {evento.nombre}
                    <button className="boton3" onClick={() => asignacion(evento.id)}>Ver más</button>
                  </div>
                </InfoWindow>
              )}
            </Marker>
          );
        }
  )}
      </GoogleMap>

      <Modal
        estado={showModal}
        cambiarEstado={setShowModal}
      >
        Evento <br />
        {eventoInfo.nombre}<br />
        {eventoInfo.descripcion}<br />
        {Date.parse(eventoInfo.fecha_inicio)}<br />
        <Link >Creador</Link>
      </Modal>
    </div>
  );
}

export default React.memo(Mapa);
