import React, { useEffect, useState } from "react";
import instance from "../../../api/axios";
import useAuth from "../../../auth/useAuth";

const DatosNegocio = () => {


  const { user } = useAuth();
   
  return (
    <div className="informacionNegocio">
      <section className="titulo">
        <h1>Datos del Negocio</h1>
      </section>
      <form action="">
        <section className="info">
          <p>Nombre del negocio</p>
          <input type="text" dafaultValue={user.nombre_cargo} />
          <p>Descripción</p>
          <input type="text" dafaultValue={user.descripcion} />
          <p>Correo electrónico</p>
          <input type="text" dafaultValue={user.email} />
          <p>Teléfono</p>
          <input type="text" dafaultValue={user.telefono} />
        </section>
        {/* <button type="submit">Guadar Cambios</button> */}
      </form>
    </div>
  );
}

export default DatosNegocio;