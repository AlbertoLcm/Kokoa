import React from "react";
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
          <input type="text" value={user.nombre_cargo} />
          <p>Descripción</p>
          <input type="text" value={user.description} />
          <p>Correo electrónico</p>
          <input type="text" value={user.email} />
          <p>Teléfono</p>
          <input type="text" value={user.telefono} />
        </section>
      </form>
    </div>
  );
}

export default DatosNegocio;