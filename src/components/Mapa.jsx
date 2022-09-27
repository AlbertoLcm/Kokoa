import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from "react";
import { useEffect } from "react";
import Marcador from "./Marcador";

const AnyReactComponent = ({ text }) => <div>{text}</div>;


function Mapa(){
  
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

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyC9solbk3q4EuYuef97FhGJJnDAD83jvAs" }}
        center={valores.center}
        zoom={valores.zoom}
      >
        <Marcador 
          tipo={"marcBase"}
          lat={valores.center.lat}
          lng={valores.center.lng}
          texto={"Usuario"}
        />
        <Marcador
          tipo={"marcBase"}
          lat={16.946262}
          lng={120.831239}
          texto="Monte Clitoris"
        />
      </GoogleMapReact>
    </div>
  );
}

export default Mapa;