import React from 'react'
import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
const google = window.google;

const containerStyle = {
  width: '100%',
  height: '100%'
};
let center = {
  lat: 16.946234,
  lng: 120.831413
}
let ubicarGlobo = () => {
  let currentloc = {
    lat: 0,
    lng: 0
  }
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      currentloc.lat = position.coords.latitude;
      currentloc.lng = position.coords.longitude;
    });
  }else{
    alert("Tu navegador no soporta el localizarte");
  }
  return currentloc;
}
const centro = ubicarGlobo();
alert(centro);
function Mapa() {

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyC9solbk3q4EuYuef97FhGJJnDAD83jvAs"
  })

  const [map, setMap] = React.useState(null)


  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        { 
        <Marker onLoad={onLoad} position={centro} title={"Por fin"}/>
        /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>
  ) : <></>
}

export default Mapa;

