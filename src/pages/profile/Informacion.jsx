import React, { useState } from "react";
import useAuth from "../../auth/useAuth";

const Información = () => {

  const { user } = useAuth();

  const [nombreActive, setNombreActive] = useState(false);
  const [contactoActive, setContactoActive] = useState(false);
  const [fechaActive, setFechaActive] = useState(false);
  const [lugarActive, setLugarActive] = useState(false);

  return (
    <div className="contInformacionProfile">
      <section className="titulo">
        <h1>Tu perfil, {user.nombre} {user.apellidos}</h1>
      </section>

      <section className="foto">
        <img src={user.perfil} alt="perfil" />
      </section>

      <h2>Configuración general</h2>

      <section className="datos">
        <div className="dato">
          <section>
            <h3>Nombre</h3>
            <p>{user.nombre} {user.apellidos}</p>
          </section>

          <section>
            <button>Editar</button>
          </section>
        </div>
        <div className="dato" >
          <section>
            <h3>Contacto</h3>
            <p>{user.email}</p>
          </section>

          <section>
            <button>Editar</button>
          </section>
        </div>
        <div className="dato" >
          <section>
            <h3>Fecha de nacimiento</h3>
            <p>{user.fecha_nacimiento}</p>
          </section>

          <section>
            <button>Editar</button>
          </section>
        </div>
        <div className="dato" >
          <section>
            <h3>Lugar de residencia</h3>
            <p>{user.direccion}</p>
          </section>

          <section>
            <button>Editar</button>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Información;