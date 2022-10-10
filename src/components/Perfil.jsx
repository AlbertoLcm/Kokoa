import React, { useState } from "react";
import useAuth from "../auth/useAuth";
import Modal from "./Modal";

function Perfil() {
  const {user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  return (
    // Actualizacion de información del usuario
    <div className="perfilUser">
      <section className="datosUser">
        <div id="imagenUser">

        <img src="" alt="" />
        </div>
        <label>Nombre: </label>
        <label>{"  "}{user[0].nombre}{" "}{user[0].apellidos} </label>
      </section>
        <label>Ubicacion: </label>
        <label >Aqui va su Municipio </label>
      <div></div>
      <label>Email: </label>
      <label className="labCorr">{" "}{user[0].email} </label>
      <div></div>
      <label>Numero de telefono: </label>
      <label >{" "}{user[0].telefono} </label>
      <div></div>
      <button onClick={() => setShowModal(!showModal)}>Agregar un domicilio</button>
      <Modal
      estado={showModal}
      cambiarEstado={setShowModal} 
      >
        <form action="">
          <label>Codigo Postal</label>
          <input type="text" />
          <label>Estado</label>
          <input type="text" />
          <label>Municipio/Alcaldia</label>
          <input type="text" />
          <label>Colonia</label>
          <input type="text" />
          <label>Calle</label>
          <input type="text" />
          <label>Numero exterior</label>
          <input type="text" />
          <label>Numero Interior (opcional)</label>
          <input type="text" />
          <button>Agregar</button>
        </form>
      </Modal>
      <button>Cerrrar Sesion</button>
    </div>
  );
}

export default Perfil;