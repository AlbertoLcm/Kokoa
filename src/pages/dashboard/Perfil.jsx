import React from "react";
import useAuth from "../../auth/useAuth";
import ComentariosNegocio from "../../components/social/ComentariosNegocio";

const Perfil = () => {

  const { user } = useAuth();
  
  return (
    <div className="contDashboardPerfil">
      <div id="ContenedorFeedPerfilNegocioGeneral">

        <div id="ContenedorFeedPerfilNegocio">

          <section id="PortadaPerfilAnfitrion">
            <img src={user.portada} id="ImagePortadaPerfilAnfitrion" />
          </section>

          <section id="InfPerfilAnfitrion">
            <section id="DatosPerfilAnfitrion">
              <section>
                <h1>{user.nombre_cargo}</h1>
                <p>4.9 Opiniones</p>
              </section>
            </section>

            <section id="ContFotoPerfilAnfitrion">
              <div id="FotoPerfilAnfitrion">
                <img src={user.perfil} id="ImageFotoPerfilAnfitrion" />
              </div>
            </section>
          </section>
          <section id="InfOpinionesAnfitrion">
            <h2>Calificacion - 4.9 (19 Opiniones)</h2>

            <div id="Comentar">
              <section className="contFotoUsuario">
                <img src={user.perfil} alt="Foto Usuario" />
              </section>

              <section className="comentario">
                <p>
                  Comenta algo interesante
                </p>
              </section>
            </div>

            <ComentariosNegocio id_negocio={user.id} />

          </section>
        </div>
      </div>
    </div>
  );
}
export default Perfil;