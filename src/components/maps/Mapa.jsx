import React, { useState, useEffect } from "react";
import instance from "../../api/axios";
import InfEvento from "../infElements/InfEvento";
import useAuth from "../../auth/useAuth";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";
import marker from "../../images/marker.png";
import point from "../../images/point.png";
import { libraries, stylesArray } from "../../helpers/methodsMap";
import socket from "../sockets/Socket";

function Mapa({ mapSet, map }) {
  
  const { addEventos, addEventosTranscurso, asignacionMetodo, mostrar } = useAuth();

  const [activeMarker, setActiveMarker] = useState(null);
  const [lugares, setLugares] = useState([]);
  const [eventosTranscurso, setEventosTranscurso] = useState([]);
  const [eventosTrancursoTotal, setEventosTranscursoTotal] = useState([]);
  const [eventoInfo, setEventoInfo] = useState({});
  const [centerMy, setCenterMy] = useState({ lat: 19.4326077, lng: -99.133208 });
  const rango = [];
  const curso = [];
  const asignacion = (id) => {
    handleActiveMarker(id);
    const eve = lugares.find((evento) => evento.id_evento === id);
    setEventoInfo(eve);
    map.panTo({ lat: eve.lat, lng: eve.lng })
    map.setZoom(18);
  }

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

    instance.get('/eventos/transcurso').then((results) => {
      setEventosTranscurso(results.data);
    });

    socket.on('new-evento', (evento) => {
      instance.get("/eventos").then((results) => {
        setLugares(results.data);
      });

      instance.get('/eventos/transcurso').then((results) => {
        setEventosTranscurso(results.data);
      });
    });
    
  }, []);

  useEffect(() => {
    // Rango son los eventos cercanos. los enviamos al authProvider para mostrarlos en la pagina Home
    if (!!rango.length) {
      addEventos(rango);
    }
    if (!!curso.length) {
      addEventosTranscurso(curso);
    }
  }, [lugares, centerMy, map]);

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

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };
  
  if (!!lugares.length && circle.getBounds()) {
    lugares.forEach((evento) => {
      if (circle.getBounds().contains({ lat: evento.lat, lng: evento.lng })) {
        // Enviamos los eventos que estan dentro del rango 
        rango.push({
          id_evento: evento.id_evento,
          evento: evento.nombre,
          fecha: evento.fecha_inicio,
          ubicacion: evento.direccion,
          lat: evento.lat,
          lng: evento.lng,
          // Enviamos el metodo para que se pueda hacer click en el evento y se muestre en el mapa
          asignacion
        });
      }
    });
  }

  if(!!eventosTranscurso.length) {
    eventosTranscurso.forEach((evento) => {
      curso.push({
        ...evento,
        asignacion
      });
    });
  }
  
  const desasignacion = () => {
    setActiveMarker(null);
    map.setZoom(15);
  }
  const alrededor = () => {
    // eslint-disable-next-line no-undef
    map.setZoom(12);
  }
  const centrar = () => {
    // eslint-disable-next-line no-undef
    map.panTo(centerMy);
    // eslint-disable-next-line no-undef
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

        <Marker 
        position={centerMy}
        icon={point}
        />

        {lugares.map((evento) => {
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
                        evento={eventoInfo}
                        cerrar={desasignacion}
                      />
                    </div>
                  </div>
              )}
              
              {activeMarker === evento.id_evento && (
                <InfoWindow>
                  <h2>{evento.nombre}</h2>
                </InfoWindow>
              )}
            </Marker>
          )
        })}
        <div className="contBtnMapa">
          <button onClick={() => alrededor()}>A tu alrededor</button>
          <button onClick={() => centrar()}>Centrar</button>
        </div>
      </GoogleMap>
    </>
  )
}

export default React.memo(Mapa);
