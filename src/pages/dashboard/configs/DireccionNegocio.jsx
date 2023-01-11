import React, { useEffect, useState, useRef } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { libraries } from "../../../helpers/methodsMap";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import MapNegocio from "../../../components/maps/MapNegocio";
import LoadingElement from "../../../components/loadings/LoadingElement"

const DireccionNegocio = () => {

    const [negocio, setNegocio] = useState({})
    const [cambioDir, setCambioDir] = useState(false)
    const [cargandoPagina, setCargandoPagina] = useState(true)
    const [esperandoRespuesta, setEsperandoRespuesta] = useState(false)
    const [newData, setNewData] = useState({})
    const { user } = useAuth();

    const changeCambioDir = () => {
      setCambioDir(!cambioDir)
    }
    const actualizarDatos = () => {      
      if(!dirRef.current?.value) return alert('ingresa ubicación');
      // setEsperandoRespuesta(true)

      // eslint-disable-next-line no-undef
      const geocoder = new google.maps.Geocoder()
      
      geocoder.geocode({'address': dirRef.current.value}, (results) =>{
          instance.put(`/negocios/${user.id}`, {
            lat: results[0].geometry.location.lat(),
            direccion: dirRef.current.value,
            lng: results[0].geometry.location.lng(),
          })
        .then((res) => {
          instance.get(`/negocios/${user.id}`)
          .then((response) => {
            setNegocio(response.data)
        })
        })
        .catch((error) => {
          console.log(error)
        })
        setCambioDir(false)
        setEsperandoRespuesta(false)
        alert("Actualizado correctamente (En caso de no ver el cambio, recargue la pagina)")
        })  
        

    

      
    }
    
    /** @type React.MutableRefObject<HTMLInputElement> */
    const dirRef = useRef();

    useEffect (() => {
      instance.get(`/negocios/${user.id}`)
      .then((res) => {
        setNegocio(res.data)
        setCargandoPagina(false)
      })
    }, [])

    if(cargandoPagina){
      return(
        <LoadingElement />
      )
    }
    return(
      <div className="informacionNegocio">
          <section className="titulo">
              <h1>Direccion del Negocio</h1>
          </section>
          <section className="info">
            <h5>Direccion actual</h5>
            <h2>{negocio.direccion !== null ? (negocio.direccion) : ("Aun no has ingresado una direccion")}</h2>
            {
            cambioDir === false ? (
              <button onClick={changeCambioDir} >Cambiar direccion</button>
            ) : (              
                  <div id="cambiarDato">
                    {esperandoRespuesta ? (
                      <LoadingElement />
                    ) : (
                      <>
                        <Autocomplete>
                          <input id="ubicacion" placeholder="" name="ubicacion" type="text" ref={dirRef} required />
                        </Autocomplete>
                        <section id="cambiarDatoBotones">
                          <button onClick={changeCambioDir} >Cancelar</button>
                          <button onClick={actualizarDatos}>Actualizar</button>
                        </section></>
                    )}
                  </div>
              )
            }
          </section>
          <div className="contMapaNegocio">
            {negocio.direccion !== null ? (
                    <MapNegocio coordenadas={{ lat: parseFloat(negocio.lat), lng: parseFloat(negocio.lng) }} />
            ) : (
                <h2>Por favor ingrese una direccion para mostrar el mapa</h2>
            )}
          </div>
      </div>
    )
    
}

export default DireccionNegocio;