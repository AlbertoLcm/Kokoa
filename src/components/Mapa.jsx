import React from "react";
import GoogleMapReact from 'google-map-react';
import { useState } from "react";
import { useEffect } from "react";

const AnyReactComponent = ({ text }) => <div>{text}</div>;


function Mapa(){
  
  const [valores, setValores] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((coordenada) => {
      setValores({center: {
        lat: coordenada.coords.latitude,
        lng: coordenada.coords.longitude
      },
      zoom: 17
    });
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
        <AnyReactComponent
          lat={19.3143719}
          lng={-98.8798994}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default Mapa;