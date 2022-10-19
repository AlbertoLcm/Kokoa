import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../Skeleton";
import image from "../../images/Wall (15).jpg"
import foto from "../../images/Wall (59).jpg"
import fotos from "../../images/establecimiento.jpg"
import '../../stylesheets/VisPerfs.css'

function DatosAnfitrion({ id, section }) {

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

  if (loading) {
    return <Skeleton type={'perfilFeed'} />
  }

  switch (section) {
    case 'perfil': return (
      <>
        <section id="PortadaPerfilAnfitrion">
          <img src={image} id="ImagePortadaPerfilAnfitrion" />
        </section>

        <section id="InfPerfilAnfitrion">
          <section id="DatosPerfilAnfitrion">
            <h1>{anfitrion.nombre}</h1>
            <p>4.9 Opiniones</p>
            <p>{auth.email}</p>
            <p>{auth.telefono}</p>
          </section>

          <section id="ContFotoPerfilAnfitrion">
            <div id="FotoPerfilAnfitrion">
              <img src={foto} id="ImageFotoPerfilAnfitrion" />
            </div>
          </section>
        </section>
      </>
    );
    case 'informacion': return (
      <>
        <section id="InfDetallesAnfitrion">
          <div className="datosAnfitrion">
            <h2>Detalles</h2>
            <p> <b> Negocio </b> - Restaurante</p>
            <p className="horario">Siempre abierto</p>
            <p className="telefono">552255533</p>
            <p className="correo">tunegocio@gmail.com</p>
            <p className="web"><a href="">www.grannegocio.com</a></p>
            <p className="ubicacion">San roberto ixtapaluca México, 55645, N. 8</p>
            <p className="descripcion">
              Somos un negocio comercial con grandes
              ofertas accecibles para todos
            </p>
           </div>

          <section className="fotosAnfitrion">
            <h2>Fotos</h2>
            <div className="contFotosAnfitrion">
              <div className="fotoAnfitrion">
                <img src={fotos} />
              </div>
              <div className="fotoAnfitrion">
                <img src={fotos} />
              </div>
              <div className="fotoAnfitrion">
                <img src={fotos} />
              </div>
              <div className="fotoAnfitrion">
                <img src={fotos} />
              </div>
            </div>
          </section>
        </section>

        <section id="InfOpinionesAnfitrion">
          <h2>Calificacion - 4.9 (19 Opiniones)</h2>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

          <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>

           <div className="opinionesAnfitrion">
            <div className="opinionAnfitrion">
              <section className="contOpinador">
                <div className="fotoOpinador">
                  <img src={foto} />
                </div>
                <div className="nombreOpinador">
                  <p>Alberto Cruz Marín</p>
                  <p className="fecha">Noviembre 17</p>
                </div>

              </section>
              <section className="contOpinion">
                <p>
                  Es un grandioso lugar para pasar el rato,
                  buen ambiente. Sin duda volveré.
                </p>
              </section>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default DatosAnfitrion;