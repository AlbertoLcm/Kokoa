import React, { useState } from "react";
import Modal from "./Modal";

function Perfil() {

  const [showModal, setShowModal] = useState(false);
  
  return (
    // Actualizacion de información del usuario
    <div className="perfilUser">
      <section className="datosUser">
        <div id="imagenUser">

        <img src="" alt="" />
        </div>
        Nombre del usuario
        Telefono usuario
      </section>
      <label>Ubicacion</label>
      <input type="text"/>
      <label>Email</label>
      <input type="text" />
      <label>Numero de telefono</label>
      <input type="text" />
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