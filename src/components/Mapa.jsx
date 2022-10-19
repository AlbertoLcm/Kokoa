import React, { useState, useEffect } from "react";
import instance from "../api/axios";
import InfEvento from "./infElements/InfEvento";
import useAuth from "../auth/useAuth";
import { GoogleMap, InfoWindow, Marker, useJsApiLoader } from "@react-google-maps/api";
import marker from "../images/marker4.png";
import { libraries, stylesArray } from "../helpers/methodsMap";

const containerStyle = {
  width: "100%",
  height: "100vh"
};

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
    if (!!rango.length) {
      addEventos(rango);
    }
  }, [lugares, mostrar, centerMy]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries,
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
    strokeOpacity: 0,
    strokeWeight: 2,
    fillColor: "#009ee0",
    fillOpacity: 0
  });

  if (!!lugares.length && circle.getBounds()) {
    lugares.forEach((evento) => {
      if (circle.getBounds().contains({ lat: evento.lat, lng: evento.lng })) {
        rango.push({ evento: evento.nombre, ubicacion: evento.ubicacion, lat: evento.lat, lng: evento.lng });
      }
    });
  }

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const asignacion = (id) => {
    handleActiveMarker(id);
    const eve = lugares.find((evento) => evento.id_evento === id);
    setEventoInfo(eve);
  }

  return (
    <div>
      <GoogleMap mapContainerStyle={containerStyle}
        center={centerMy}
        zoom={16}
        options={{
          styles: stylesArray,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          center: true
        }}
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
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <div className="markerInfo">
                      <InfEvento
                        id={eventoInfo.id_evento}
                        evento={eventoInfo} 
                      />
                    </div>
                  </InfoWindow>
                )};
              </Marker>
            );
          // }
        })};
      </GoogleMap>
    </div>
  );
}

export default React.memo(Mapa);
