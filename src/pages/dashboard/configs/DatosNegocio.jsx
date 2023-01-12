import React, { useEffect, useState } from "react";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";
import LoadingElement from "../../../components/loadings/LoadingElement"

const DatosNegocio = () => {

  const [cambioNombre, setCambioNombre] = useState(false)
  const [cambioDescripcion, setCambioDescripcion] = useState(false)
  const [cambioEmail, setCambioEmail] = useState(false)
  const [cambioNumero, setCambioNumero] = useState(false)
  const [cargandoPagina, setCargandoPagina] = useState(true)
  const [esperandoRespuesta, setEsperandoRespuesta] = useState(false)
  const [negocio, setNegocio] = useState({})
  const { user } = useAuth();

  const [newDatos, setNewDatos] = useState({
    nombre: "",
    descripcion: "",
    email: "",
    numero: ""
  })

  const changeCambioNombre = () => {
    setCambioNombre(!cambioNombre)
  }
  const changeCambioDescripcion = () => {
    setCambioDescripcion(!cambioDescripcion)
  }
  const changeCambioEmail = () => {
    setCambioEmail(!cambioEmail)
  }
  const changeCambioNumero = () => {
    setCambioNumero(!cambioNumero)
  }
  const handleChange = (input)  => {
    setNewDatos({
      ...newDatos,
      [input.target.name]: input.target.value
    })
  }
  const actualizarDatos = () => {
    setEsperandoRespuesta(true)
    // console.log(newDatos)
    instance.put(`/negocios/${user.id}`, newDatos)
    .then((res) => {
      // instance.get(`/negocios/${user.id}`)
      // .then((response) => {
      //   setNegocio(response)
      //   alert("informacion actualizada con exito")
        setEsperandoRespuesta(false)
        setCambioNombre(false)
        setCambioDescripcion(false)
        setCambioEmail(false)
        setCambioNumero(false)
      // })
    })
    .catch((error) => {
      console.warn(error)
    })
  }
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
  return (
    <div className="informacionNegocio">
      <section className="titulo">
        <h1>Datos del Negocio</h1>
      </section>
        <section className="info">
          <h5>Nombre del negocio</h5>
          <h2>{negocio.nombre !== null ? (negocio.nombre) : ("Ups, algo salio mal")}</h2>
          {
            cambioNombre === false ? (
              <button onClick={changeCambioNombre} >Cambiar nombre</button>
            ) : (
              <div id="cambiarDato">
                {
                  esperandoRespuesta ? (
                    <LoadingElement />
                  ) : (
                    <>
                      <input type="text" name="nombre" placeholder="Ingrese aqui el nombre de su negocio" onChange={handleChange} />
                      <section id="cambiarDatoBotones">
                        <button onClick={changeCambioNombre} >Cancelar</button>
                        <button onClick={actualizarDatos}>Actualizar</button>
                      </section>
                    </>
                  )
                }
              </div>

            )
          }

          <h5>Descripción</h5>
          <h2>{negocio.descripcion !== null ? (negocio.descripcion) : ("Aun no has escrito una descripción")}</h2>
          {
            cambioDescripcion === false ? (
              <button onClick={changeCambioDescripcion} >Cambiar descripcion</button>
            ) : (
              <div id="cambiarDato">
                {
                  esperandoRespuesta ? (
                    <LoadingElement />
                  ) : (
                    <>
                      <input type="text" name="descripcion" placeholder="Escriba aqui la descripcion de su negocio" onChange={handleChange} />
                      <section id="cambiarDatoBotones">
                        <button onClick={changeCambioDescripcion} >Cancelar</button>
                        <button onClick={actualizarDatos}>Actualizar</button>
                      </section>
                    </>
                  )
                }
              </div>

            )
          }

          <h5>Correo electrónico</h5>
          <h2>{negocio.email !== null ? (negocio.email) : ("Aun no has agregado un correo electronico")}</h2>
          {
            cambioEmail === false ? (
              <button onClick={changeCambioEmail} >Cambiar correo electronico</button>
            ) : (
              <div id="cambiarDato">
                {
                  esperandoRespuesta ? (
                    <LoadingElement />
                  ) : (
                    <>
                      <input type="text" name="email" placeholder="Escriba aqui el Email de su negocio" onChange={handleChange} />
                      <section id="cambiarDatoBotones">
                        <button onClick={changeCambioEmail} >Cancelar</button>
                        <button onClick={actualizarDatos}>Actualizar</button>
                      </section>
                    </>
                  )
                }
              </div>

            )
          }

          <h5>Teléfono</h5>
          <h2>{negocio.numero !== null ? (negocio.numero) : ("Aun no has agregado un numero de contacto")}</h2>
          {
            cambioNumero === false ? (
              <button onClick={changeCambioNumero} >Cambiar numero</button>
            ) : (
              <div id="cambiarDato">
                {
                  esperandoRespuesta ? (
                    <LoadingElement />
                  ) : (
                    <>
                      <input type="text" name="numero" placeholder="Escriba aqui el numero de contacto de su negocio" onChange={handleChange} />
                      <section id="cambiarDatoBotones">
                        <button onClick={changeCambioNumero} >Cancelar</button>
                        <button onClick={actualizarDatos}>Actualizar</button>
                      </section>
                    </>
                  )
                }
              </div>

            )
          }
        </section>
    </div>
  );
}

export default DatosNegocio;