import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../Skeleton";

function DatosAnfitrion({id}) {

  const [anfitrion, setAnfitrion] = useState({});
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    instance.get(`/auth/${id}`)
      .then((anfitrion) => {
        setAnfitrion(anfitrion.data.user[0])
        setAuth(anfitrion.data.auth[0])
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
      {anfitrion.domicilio} <br />
      <label>Contactanos: </label> <br />
      email: <br />
      { auth.email} <br />
      telefono: <br />
      { auth.telefono} <br />
    </>
  )
}

export default DatosAnfitrion;