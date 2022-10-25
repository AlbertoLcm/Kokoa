import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import InfEvento from "./infElements/InfEvento";
import useAuth from "../auth/useAuth";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import marker from "../images/marker4.png";
import { libraries, stylesArray } from "../helpers/methodsMap";

function Mapa({ mapSet, map }) {
  const { addEventos, mostrar } = useAuth();

  const [activeMarker, setActiveMarker] = useState(null);

  const [lugares, setLugares] = useState([]);

  const [eventoInfo, setEventoInfo] = useState({});

  const [centerMy, setCenterMy] = useState({ lat: 19.4326077, lng: -99.133208 });
  const rango = [];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coordenada) => {
      if (coordenada) {
        setCenterMy({
          lat: parseFloat(coordenada.coords.latitude),
          lng: parseFloat(coordenada.coords.longitude)
        });
      }
    });
    instance.get("/eventos").then((results) => {
      setLugares(results.data);
    });
  }, []);

  useEffect(() => {
    // Rango son los eventos cercanos. los enviamos al authProvider para mostrarlos en la pagina Home
    if (!!rango.length) {
      addEventos(rango);
    }
  }, [lugares, mostrar, centerMy]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries,
  });

  if (!isLoaded) {
    return <div>Fallo</div>;
  }

  // eslint-disable-next-line no-undef
  const circle = new google.maps.Circle({
    map: map,
    center: centerMy,
    radius: 4000,
    strokeColor: "#FF0099",
    strokeOpacity: 0,
    strokeWeight: 2,
    fillColor: "#009ee0",
    fillOpacity: 0
  });

  const asignacion = (id) => {
    handleActiveMarker(id);
    const eve = lugares.find((evento) => evento.id_evento === id);
    setEventoInfo(eve);
    map.panTo({ lat: eve.lat, lng: eve.lng })
    map.setZoom(18);
  }

  if (!!lugares.length && circle.getBounds()) {
    lugares.forEach((evento) => {
      if (circle.getBounds().contains({ lat: evento.lat, lng: evento.lng })) {
        // Enviamos los eventos que estan dentro del rango 
        rango.push({
          id_evento: evento.id_evento,
          evento: evento.nombre,
          ubicacion: evento.ubicacion,
          lat: evento.lat,
          lng: evento.lng,
          // Enviamos el metodo para que se pueda hacer click en el evento y se muestre en el mapa
          asignacion
        });
      }
    });
  }

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const desasignacion = () => {
    setActiveMarker(null);
    map.setZoom(15);
  }

  return (
    <>
      <GoogleMap
        mapContainerClassName="mapaHome"
        center={centerMy}
        zoom={15}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true
        }}
        icon={marker}
        onLoad={(map) => mapSet(map)}
        onClick={() => setActiveMarker(null)}>

        {lugares.map((evento) => {
          let today = new Date();
          let now = new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds());

          // if (evento.fecha_termino > now.toISOString()) {
          return (
            <Marker
              key={evento.id_evento}
              position={{
                lat: evento.lat,
                lng: evento.lng
              }}
              icon={marker}
              onClick={() => asignacion(evento.id_evento)}>

              {activeMarker === evento.id_evento && (
                <div id="MarkerInfoPos">
                  <div className="markerInfo">
                    <InfEvento
                      id={eventoInfo.id_evento}
                      evento={eventoInfo}
                      cerrar={desasignacion}
                    />
                  </div>
                </div>
              )}
            </Marker>
          )
          // }
        })}
      </GoogleMap>
    </>
  )
}

export default React.memo(Mapa);
