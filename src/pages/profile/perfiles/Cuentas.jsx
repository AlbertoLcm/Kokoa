import React, { useState } from "react";
import { useEffect } from "react";
import useAuth from "../../../auth/useAuth";
import Loading from "../../../components/loadings/LoadingElement";
import instance from '../../../api/axios.js';
import { Route, Routes, useNavigate } from "react-router-dom";
import Crear from "./Crear";

const Cuentas = () => {

  const { user, loginCargo } = useAuth();

  const navigation = useNavigate();

  const [loading, setLoading] = useState(true);
  const [cargos, setCargos] = useState({
    negocios: [],
    patrocinadores: [],
    artistas: []
  });

  useEffect(() => {
    instance.get(`/cargos/${user.id}`)
      .then((response) => {
        setCargos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (loading) return <Loading />

  if (!cargos.negocios.length && !cargos.patrocinadores.length && !cargos.artistas.length) return (
    <div className="contCuentasProfile">
      <Routes>
        <Route path="crear/*" element={<Crear />} />
      </Routes>
      <section className="title">
        <h1>Aún no tienes cuentas para administrar.</h1>
      </section>
      <section className="informacion">

        <div className="titulo">
          <div className="background">
            <h2>¿Cómo funciona esto?</h2>
          </div>
        </div>

        <p>
          Puedes crear un negocio, ser patrocinador
          de eventos o participar en estos como
          un artista independiente.
        </p>
      </section>
      <button className="btnComenzar" onClick={() => navigation('/perfil/perfiles/cuentas/crear')}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-circle-plus" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <circle cx="12" cy="12" r="9" />
          <line x1="9" y1="12" x2="15" y2="12" />
          <line x1="12" y1="9" x2="12" y2="15" />
        </svg>
        Comenzar ahora
      </button>
    </div>
  )

  return (
    <div className="contCuentasProfile">
      <Routes>
        <Route path="crear/*" element={<Crear />} />
      </Routes>
      <section className="title">
        <h1>Cuentas que administras</h1>
        <p>Selecciona una cuenta para acceder a ella y administrarla.</p>
      </section>

      <section className="cuentas">
        {cargos.negocios.length ? <h2>Negocios</h2> : null}
        {cargos.negocios.map((negocio) => {
          return (
            <div className="cuenta" onClick={() => loginCargo(negocio)}>
              <section className="foto">
                <img src={negocio.perfil} alt="perfil" />
              </section>

              <section>
                <h3>{negocio.nombre}</h3>
              </section>
            </div>
          )
        })}
        {cargos.patrocinadores.length ? <h2>Patrocinios</h2> : null}
        {cargos.patrocinadores.map((patrocinio) => {
          return (
            <div className="cuenta" onClick={() => loginCargo(patrocinio)}>
              <section className="foto">
                <img src={patrocinio.perfil} alt="perfil" />
              </section>

              <section>
                <h3>{patrocinio.nombre}</h3>
              </section>
            </div>
          )
        })}
        {cargos.artistas.length ? <h2>Artistas</h2> : null}
        {cargos.artistas.map((artista) => {
          return (
            <div className="cuenta" onClick={() => loginCargo(artista)}>
              <section className="foto">
                <img src={artista.perfil} alt="perfil" />
              </section>

              <section>
                <h3>{artista.nombre}</h3>
              </section>
            </div>
          )
        })}
      </section>
    </div>
  );
};

export default Cuentas;