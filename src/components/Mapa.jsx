import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from "react";
import { useEffect } from "react";
import Marcador from "./Marcador";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Mapa({ ubicaciones }){
  
  const [valores, setValores] = useState({
    center: {
      lat: 16.946262,
      lng: 120.831239
    },
    zoom: 17
  });
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coordenada) => {
      if(coordenada){
        setValores({center: {
          lat: coordenada.coords.latitude,
          lng: coordenada.coords.longitude
        },
        zoom: 17
        });  
        return;
      }      
        });
  },[]);

  console.log(ubicaciones)
  
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyC9solbk3q4EuYuef97FhGJJnDAD83jvAs" }}
        center={valores.center}
        zoom={valores.zoom}
      >
        {/* {ubicaciones.forEach((ubicaciones[0]) => {
          <Marcador 
            tipo={"marcBase"}
            lat={lugar.lat}
            lng={lugar.lng}
            texto={lugar.nombre}
          />
        })} */}

          <Marcador 
            tipo={"marcBase"}
            lat={ubicaciones[0].lat}
            lng={ubicaciones[0].lng}
            texto={ubicaciones[0].nombre}
          />
      </GoogleMapReact>
    </div>
  );
}

export default Mapa;