import React, { useState, useEffect } from "react";
import instance from "../../api/axios";
import InfEvento from "../infElements/InfEvento";
import useAuth from "../../auth/useAuth";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import marker from "../../images/marker.png";
import point from "../../images/point.png";
import { libraries, stylesArray } from "../../helpers/methodsMap";
import socket from "../sockets/Socket";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function Mapa({ mapSet, map }) {

  const { addEventos } = useAuth();
  const navigation = useNavigate();
  const location = useLocation();

  // Obtención de parametros de la url
  const [params, setParams] = useSearchParams();
  const paramNombre = params.get("nombre");
  const paramId = parseInt(params.get("id"));

  // Variables de estado
  const [eventos, setEventos] = useState([]);
  const [activeMarker, setActiveMarker] = useState(null);
  const [eventoInfo, setEventoInfo] = useState({});
  const [center, setCenter] = useState({
    lat: 19.4326077,
    lng: -99.133208
  });
  const [centerMarker, setCenterMarker] = useState({
    lat: 19.4326077,
    lng: -99.133208
  });

  // Función para asignar el evento al mapa
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries,
  });

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const asignacion = (id) => {
    handleActiveMarker(id);
    instance.get(`/eventos/evento/${id}`).then((results) => {
      setEventoInfo(results.data);
      setCenter({
        lat: parseFloat(results.data.lat),
        lng: parseFloat(results.data.lng)
      })
      map.setZoom(18);
    });
  }

  useEffect(() => {
    if (paramNombre && paramId) {
      asignacion(paramId);
    }
  }, [params]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coordenada) => {
      if (coordenada) {
        setCenter({
          lat: parseFloat(coordenada.coords.latitude),
          lng: parseFloat(coordenada.coords.longitude)
        });
        setCenterMarker({
          lat: parseFloat(coordenada.coords.latitude),
          lng: parseFloat(coordenada.coords.longitude)
        });
      }
    });

    instance.get("/eventos").then((results) => {
      setEventos(results.data);
    });

    socket.on('new-evento', (evento) => {
      setEventos([...eventos, evento]);
    });
  }, []);

  // Función para filtrar los eventos por ubicación
  const eventosUbicacion = () => {

    // eslint-disable-next-line no-undef
    const circle = new google.maps.Circle({
      map: map,
      center: centerMarker,
      radius: 30000,
      strokeColor: "#f3f3f300",
      strokeOpacity: 1,
      strokeWeight: 2,
      fillColor: "#009ee0",
      fillOpacity: 0
    });

    if (eventos.length || circle.getBounds()) {
      let rango = eventos.filter((evento) => {
        return circle.getBounds().contains({ lat: evento.lat, lng: evento.lng });
      });

      addEventos(rango);
    }
  };

  useEffect(() => {
    if (isLoaded) {
      eventosUbicacion();
    }
  }, [eventos]);

  // Renderizado del mapa
  if (!isLoaded) {
    return <div>Fallo</div>;
  }

  // Metodos para el mapa

  const desasignacion = () => {
    // borramos los parametros de la url
    params.delete("nombre");
    params.delete("id");
    setParams(params);

    setActiveMarker(null);
    map.setZoom(15);
  }

  const alrededor = () => {
    map.setZoom(12);
  }

  const centrar = () => {
    map.panTo(centerMarker);
    map.setZoom(15);
  }

  return (
    <GoogleMap
      mapContainerClassName="mapaHome"
      center={center}
      zoom={15}
      options={{
        styles: stylesArray,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      icon={marker}
      onLoad={(map) => mapSet(map)}
      onClick={() => setActiveMarker(null)}>

      <Marker
        position={centerMarker}
        icon={point}
      />

      {eventos.map((evento) => {
        return (
          <Marker
            key={evento.id_evento}
            className="marker"
            animation={
              activeMarker === evento.id_evento
                ? window.google.maps.Animation.BOUNCE
                : null
            }
            icon={marker}
            position={{
              lat: parseFloat(evento.lat),
              lng: parseFloat(evento.lng)
            }}
            onClick={() => {
              // agregamos el id del evento a la url, si hay parametros los dejamos
              // si existe el parametro id, lo reemplazamos por el nuevo
              if (params.has("id") && params.has("nombre")) {
                params.delete("id");
                params.delete("nombre");
              }
              let url = params.toString() ? `?${params.toString()}&id=${evento.id_evento}&nombre=${evento.nombre}` : `?id=${evento.id_evento}&nombre=${evento.nombre}`;
              navigation(url)
            }}
          >

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

          </Marker>
        )
      })} 
      <div className="contBtnMapa">
        <button onClick={() => alrededor()}>A tu alrededor</button>
        <button onClick={() => centrar()}>Centrar</button>
      </div>
    </GoogleMap>
  )
}

export default React.memo(Mapa);
