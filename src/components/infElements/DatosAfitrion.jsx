import React, { useEffect, useState } from "react";
import instance from "../../api/axios";
import Skeleton from "../Skeleton";
import image from "../../images/Wall (15).jpg";
import foto from "../../images/Wall (59).jpg";
import fotos from "../../images/establecimiento.jpg";
import '../../stylesheets/VisPerfs.css';
import Comentario from "../social/Comentario";
import Comentar from "../social/Comentar";
import useAuth from "../../auth/useAuth";
import Modal from "../Modal";

function DatosAnfitrion({ id, section }) {

  const [anfitrion, setAnfitrion] = useState({});
  const [loading, setLoading] = useState(true);
  const [comentarios, setComentarios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const { user } = useAuth();

  const [comentario, setComentario] = useState({
    comentario: "",
    id_usuario: user.id,
    id_negocio: id,
  });

  useEffect(() => {
    instance.get(`/negocios/${id}`)
      .then((anfitrion) => {
        setAnfitrion(anfitrion.data)
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    instance.get(`/negocios/comentarios/${id}`)
      .then((comentarios) => {
        setComentarios(comentarios.data)
      })
  }, []);

  if (loading) {
    return <Skeleton type={'perfilFeed'} />
  }



  const handleChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  const actionPublicar = () => {
    const fecha = new Date();
    const fechaActual = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;

    instance.post("/negocios/comentarios", { comentario, fecha: fechaActual })
      .then((res) => {
        setShowModal(false);
        instance.get(`/negocios/comentarios/${id}`)
          .then((comentarios) => {
            setComentarios(comentarios.data)
          })
      })
      .catch((err) => console.log(err));
  };

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
            <p>{anfitrion.email}</p>
            <p>{anfitrion.telefono}</p>
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

          <Modal
            estado={showModal}
            cambiarEstado={setShowModal}
            titulo={"Comentar"}
          >
            <div id="contComentarModal">
              <textarea name="comentario" id="txtComentar" placeholder="Comenta algo sobre este negocio" onChange={handleChange} />
              <button onClick={() => actionPublicar()}>Comentar</button>
            </div>
          </Modal>

          <div id="Comentar">
            <section className="contFotoUsuario">
              <img src={foto} alt="Foto Usuario" />
            </section>

            <section className="comentario">
              <p onClick={() => setShowModal(!showModal)}>
                Comenta algo sobre este negocio
              </p>
            </section>
          </div>

          {!comentarios.length ? (<div className="comentariosNull"> No hay comentarios </div>) : (null)}

          {comentarios.map((comentario) => {
            return (
              <Comentario data={comentario} />
            )
          })}

        </section>
      </>
    );
  }
}

export default DatosAnfitrion;