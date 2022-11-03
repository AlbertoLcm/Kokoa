import React, { useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import instance from "../api/axios";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import MapSmall from "../components/maps/MapSmall";
import imagen from "../images/concert.jpg"
import '../stylesheets/pages/Eventos.css';
import Skeleton from "../components/Skeleton";

function Evento() {
  const { id } = useParams();
  const { user } = useAuth();
  const [evento, setEvento] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [anfitrion, setAnfitrion] = React.useState({});
  const [error, setError] = React.useState(false);
  const location = useLocation();
  const nav = useNavigate();

  console.log(location);

  useEffect(() => {
    // Obtenemos el evento
    instance.get(`/eventos/evento/${id}`)
      .then((res) => {
        setEvento(res.data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => setLoading(false));

    // Obtenemos el anfitrion
    instance.get(`/eventos/${id}`)
      .then((res) => {
        setAnfitrion(res.data);
      })
  }, []);

  if (loading) {
    return (
      <section id="ContEventoGeneralSecundario">
        <Skeleton type={"perfilFeed"} />
      </section>
    )
  }

  if (error) {
    return (
      <>
        <Header tipo={'responsive'} perfil={user.nombre} back={true} />
        <section id="ContEventoGeneralSecundario">
          <div> Este evento no existe, ha sido borrado o se ha deshabilitado. </div>
        </section>
      </>
    )
  }

  let fecini = new Date(evento.fecha_inicio)

  return (
    <>
      <Header tipo={'responsive'} perfil={user.nombre} back={true} />
      <div id="ContEventoGeneral">

        <div className="btnBack" onClick={() => nav(-1, {state: {visua: 2} })}>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="5" y1="12" x2="11" y2="18" />
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
        </div>

        <section id="ContTituloEvento">
          <div id="TituloEvento">
            <div className="contImagenEvento">
              <div className="imagenEvento">
                <img src={imagen} alt="Imagen del evento" />
              </div>
            </div>

            <div className="titulo">
              <p className="infEventoFecha">
                Incia el
                {` ${fecini.toLocaleDateString()} `}
                a las
                {` ${fecini.toLocaleTimeString()} `}
                horas
              </p>
              <h1>{evento.nombre}</h1>
            </div>

            <div className="botones">
              <button className="asistir">Asistir</button>
              <button>Compartir</button>
            </div>
          </div>
        </section>

        <section className="contDetallesEventoGeneral">
          <div className="contDetallesEvento">
            <div className="detallesEvento">
              <div className="ubicacion">
                <section className="mapa">
                  <MapSmall evento={{ lat: evento.lat, lng: evento.lng }} />
                  <p>{evento.direccion}</p>
                </section>
              </div>

              <div className="detalles">
                <section className="informacion">
                  <h1>Detalles</h1>
                  <p className="direccion">
                    {evento.direccion}
                  </p>
                  {evento.capacidad ? <p className="capacidad">Capacidad para {evento.capacidad} personas</p> : <p className="sinCapacidad">Capacidad para todos</p>}
                  <p className="asistentes">Asistiran 12 personas</p>
                  {evento.precio === 0 || evento.precio === null ? <p className="gratis"> Entrada gratuita </p> : <p className="cover"> Cover ${evento.precio} </p>}

                </section>

                <section className="descripcion">
                  <h1>¿De qué trata este evento?</h1>
                  {evento.descripcion}
                </section>

                <section className="tipo">
                  <h1>Tipo de evento</h1>
                  <p>
                    Concierto
                  </p>
                </section>

                {!location.state ? (

                  <section className="anfitrion">
                    {evento.rol_anfitrion === "negocios" ? (
                      <>
                        <h1>Anfitrion (Negocio)</h1>
                        <Link to={`/visperfil/${evento.anfitrion}`} className={"contDetAnfitrion"}>
                          <div className='contImgAnfitrion'>
                            <img src={imagen} alt="Predefinir" />
                          </div>
                          <div className="tituloAnfitiron">
                            Un evento de {anfitrion.nombre}. <br />
                            <label> Conocer </label>
                          </div>
                        </Link>
                      </>
                    ) : (
                      <>
                        <h1>Anfitrion</h1>
                        <section className='contDetAnfitrion'>
                          <div className='contImgAnfitrion'>
                            <img src={imagen} alt="Predefinir" />
                          </div>
                          <div className="tituloAnfitiron">
                            Un evento de {anfitrion.nombre}. <br />
                          </div>
                        </section>
                      </>
                    )}
                  </section>
                ) : null}
              </div>
            </div>
          </div>

        </section>
      </div>
    </>
  );
}

export default Evento;