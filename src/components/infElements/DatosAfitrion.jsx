import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../Skeleton";

function DatosAnfitrion({id}) {

  const [anfitrion, setAnfitrion] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(`/auth/${id}`)
      .then((anfitrion) => {
        setAnfitrion(anfitrion.data[0])
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  if(loading) {
    return <Skeleton type={'perfilFeed'} />
  }
  
  return (
    <>
      <h1>{anfitrion.nombre}</h1>
      <label>Nos encontramos en: </label>
      <p>Direccion evento</p>

      <label>Contactanos: </label>
      <p>email </p>
      <p>telefono </p>
    </>
  )
}

export default DatosAnfitrion;