import React, { useState } from "react";
import foto from "../../images/Wall (59).jpg";
import Modal from '../../components/Modal';
import '../../stylesheets/components/Social.css';
import useAuth from "../../auth/useAuth";
import instance from "../../api/axios";

const Comentar = ({ id_negocio, id_evento, tipo }) => {
  const [showModal, setShowModal] = useState(false);
  const [showModalEvento, setShowModalEvento] = useState(false);
  const { user } = useAuth();

  const [comentario, setComentario] = useState({
    comentario: "",
    id_usuario: user.id,
    id_negocio: id_negocio,
    rol_usuario: user.rol,
  });

  const handleChangeEvento = (e) => {
    setComentarioEvento({
      ...comentarioEvento,
      [e.target.name]: e.target.value,
    });
  };

  const [comentarioEvento, setComentarioEvento] = useState({
    comentario: "",
    id_usuario: user.id,
    id_evento: id_evento,
  });

  const handleChange = (e) => {
    setComentario({
      ...comentario,
      [e.target.name]: e.target.value,
    });
  };

  const actionPublicar = () => {
    if (tipo === "negocio") {
      instance.post("/negocios/comentarios", comentario)
      .then((res) => {
  
      })
      .catch((err) => console.log(err));
    }

    instance.post("/eventos/comentarios", comentarioEvento)
      .then((res) => {
    
      })
      .catch((err) => console.log(err));
  };

  if(tipo == "negocio"){
    return (
      <>
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
            <img src={user.perfil} alt="Foto Usuario" />
          </section>
  
          <section className="comentario">
            <p onClick={() => setShowModal(!showModal)}>
              Comenta algo sobre este negocio
            </p>
          </section>
        </div>
      </>
    );
  }

  return (
    <>
        <Modal
          estado={showModalEvento}
          cambiarEstado={setShowModalEvento}
          titulo={"Comentar"}
        >
          <div id="contComentarModal">
            <textarea name="comentario" id="txtComentar" placeholder="Comenta algo acerca de este evento" onChange={handleChangeEvento} />
            <button onClick={() => actionPublicar()}>Comentar</button>
          </div>  
        </Modal>
  
        <div id="Comentar">
          <section className="contFotoUsuario">
            <img src={user.perfil} alt="Foto Usuario" />
          </section>
  
          <section className="comentario">
            <p onClick={() => setShowModalEvento(!showModalEvento)}>
              Comenta algo sobre este evento
            </p>
          </section>
        </div>
      </>
  );
  
};

export default Comentar;