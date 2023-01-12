import React, { useEffect, useState, useRef } from "react";
import { Autocomplete} from "@react-google-maps/api";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import MapNegocio from "../../../components/maps/MapNegocio";
import LoadingElement from "../../../components/loadings/LoadingElement"

const DireccionNegocio = () => {

    const [negocio, setNegocio] = useState({})
    const [cambioDir, setCambioDir] = useState(false)
    const [cargandoPagina, setCargandoPagina] = useState(true)
    const [esperandoRespuesta, setEsperandoRespuesta] = useState(false)
    const { user } = useAuth();

    const changeCambioDir = () => {
      setCambioDir(!cambioDir)
    }
    const pedirDatos =() => {
      instance.get(`/negocios/${user.id}`)
      .then((res) => {
        setNegocio(res.data)
        setEsperandoRespuesta(false)
        changeCambioDir()
        alert("Cambio realiazdo")
      })
    }

    const actualizarDireccion = () => {
      if(!dirRef.current?.value) return alert('ingresa ubicación');
      // eslint-disable-next-line no-undef
      const geocoder = new google.maps.Geocoder()
      geocoder.geocode({'address': dirRef.current.value}, (results) =>{
        try{
          instance.put(`/negocios/${user.id}`, {
            lat: results[0].geometry.location.lat(),
            direccion: dirRef.current.value,
            lng: results[0].geometry.location.lng(),
          })
        } catch (error) {
          console.log(error)
          alert("Lo sentimos algo salio mal")
        }
      })
      .then((res) => {
        changeCambioDir()
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
    })

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
            {
              cambioDir === false ? (
                <>
                  <h5>Direccion actual</h5>
                  <h2>{negocio.direccion !== null ? (negocio.direccion) : ("Aun no has ingresado una direccion")}</h2>
                  <button onClick={changeCambioDir} >Cambiar direccion</button>
                </>
              ) : (              
                  <div id="cambiarDato">
                    {esperandoRespuesta ? (
                      <LoadingElement />
                    ) : (
                      <>
                        <Autocomplete>
                          <input id="ubicacion" placeholder="Ingrese la direccion del negocio" name="ubicacion" type="text" ref={dirRef} required />
                        </Autocomplete>
                        <section id="cambiarDatoBotones">
                          <button onClick={changeCambioDir} >Cancelar</button>
                          <button onClick={actualizarDireccion}>Actualizar</button>
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