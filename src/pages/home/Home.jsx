import React from "react";
import useAuth from "../../auth/useAuth";
import { useRef, useState, Suspense, lazy, useEffect } from "react";
import { NavLink, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import "../../stylesheets/Home.css";
import Loading from "../../components/loadings/Loading";
import Header from "../../components/Header";
import LoadingElement from "../../components/loadings/LoadingElement";
import Eventos from './Eventos';
import Comunidad from './Comunidad';
import { libraries } from "../../helpers/methodsMap";
import socket from "../../components/sockets/Socket";
import Inicio from "./Inicio";
import Crear from "./eventos/Crear";
const Mapa = lazy(() => import("../../components/maps/Mapa"));

function Home() {

  const { user, eventos } = useAuth();
  const buscadorRef = useRef();

  const navigation = useNavigate();
  const location = useLocation();

  const [map, setMap] = useState(/** @type google.maps.Map */(null));
  const [showModal, setShowModal] = useState(false);
  const [buscadorActive, setBuscadorActive] = useState(false);
  const [busquedaEventos, setBusquedaEventos] = useState([]);
  const [busquedaNegocios, setBusquedaNegocios] = useState([]);
  const [selectBusqueda, setSelectBusqueda] = useState('eventos');
  const [search, setSearch] = useState({
    data: ''
  });

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBqhV6i7d19_4MlXk1gEtZ0flSx_7yYfo8",
    libraries: libraries,
  });

  useEffect(() => {
    socket.on('busqueda-kokoa', (data) => {
      setBusquedaEventos(data.eventos);
      setBusquedaNegocios(data.negocios);
    })
  }, [busquedaEventos, busquedaNegocios]);

  // Funciones de la pagina

  const handleSetMap = (mapita) => {
    setMap(mapita);
  };

  const handleChange = (e) => {
    setSearch({
      data: e.target.value
    });
    socket.emit('busqueda-kokoa', e.target.value);
  };

  const actionBuscar = (e) => {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    // const geocoder = new google.maps.Geocoder();
    // geocoder.geocode({
    //   address: buscadorRef.current.value,
    // }, (results, status) => {
    //   map.setCenter(results[0].geometry.location);
    //   map.setZoom(15);
    //   buscadorRef.current.value = "";
    // }
    // );
  };

  const actionDisabledBuscar = () => {
    setBuscadorActive(false);
    setSearch({
      data: ''
    });
    setBusquedaEventos([]);
    setBusquedaNegocios([]);
  }

  return (
    <>
      <Header tipo={'color'} perfil={user.nombre} back={false} >
        {!isLoaded ? (<LoadingElement />) : (
          // <Autocomplete>
          <section className={buscadorActive ? ("contBuscadorHomeActive") : ("contBuscadorHome")}>
            {buscadorActive && (
              <button className="btnBackBuscador" onClick={() => actionDisabledBuscar()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3a4" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <line x1="5" y1="12" x2="11" y2="18" />
                  <line x1="5" y1="12" x2="11" y2="6" />
                </svg>
              </button>
            )}
            <form onSubmit={actionBuscar} method="POST" >
              <input onClick={() => setBuscadorActive(true)} onChange={handleChange} value={search.data} type="text" className="buscador" placeholder="Buscar en Kokoa" ref={buscadorRef} />
              <button type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <circle cx="10" cy="10" r="7" />
                  <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
              </button>
            </form>

          </section>
          // </Autocomplete>
        )}
        {buscadorActive && (
          <div className="popmenuBuscador">
            <div className="contPopmenuBuscador">
              <h3>Busquedas</h3>
              <section className="header">
                <button onClick={() => setSelectBusqueda('lugares')} className={selectBusqueda === 'lugares' ? "active" : "btn"} >Lugares</button>
                <button onClick={() => setSelectBusqueda('eventos')} className={selectBusqueda === 'eventos' ? "active" : "btn"} >Eventos</button>
                <button onClick={() => setSelectBusqueda('negocios')} className={selectBusqueda === 'negocios' ? "active" : "btn"} >Negocios</button>
              </section>
              {!busquedaEventos.length && (<div className="busquedasNull"> Busca lugares, eventos o negocios </div>)}

              {selectBusqueda === 'eventos' && (
                <ul>
                  {busquedaEventos.map((evento, index) => (
                    <Link to={`?nombre=${evento.nombre}&id=${evento.id_evento}`} onClick={() => actionDisabledBuscar()} >
                      <li key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f369" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="10" cy="10" r="7" />
                          <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                        <h4>{evento.nombre}</h4>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}

              {selectBusqueda === 'negocios' && (
                <ul>
                  {busquedaNegocios.map((negocio, index) => (
                    <Link to={`negocio/${negocio.nombre}/${negocio.id}`} >
                      <li key={index}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f369" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <circle cx="10" cy="10" r="7" />
                          <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                        <h4>{negocio.nombre}</h4>
                      </li>
                    </Link>
                  ))}
                </ul>
              )}

            </div>
          </div>
        )}
      </Header>

      <div id="ContGeneralHome">
      <Routes>
          <Route path="crear/evento" element={<Crear />} />
        </Routes>
        <section className="contMapaHome">
          <Suspense fallback={<Loading />}>
            <Mapa mapSet={handleSetMap} map={map} />
          </Suspense>
        </section>

        <section className="feedHome">
          <section id="HeaderFeedHome">

            <button onClick={() => navigation('/crear/evento', {state: {from: location.pathname}})} className="btnLink2">Crear un evento</button>
            <div id="ContBtnFeedAnfitrion">
              <div id="BtnFeedAnfitrion">
                <NavLink to={'/inicio'} className={({ isActive }) => isActive ? "active" : ""}  >Inicio</NavLink>
                <NavLink to={'/eventos'} >Eventos</NavLink>
                <NavLink to={'/comunidad'} >Comunidad</NavLink>
              </div>
            </div>
          </section>

          <section className="contenedorContenido">
            <Routes>
              <Route path="inicio" element={<Inicio />} />
              <Route path="eventos/*" element={<Eventos />} />
              <Route path="comunidad" element={<Comunidad />} />
            </Routes>
          </section>
        </section>
      </div>
    </>
  );
}

export default Home;
