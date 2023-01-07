import React, { useState } from "react";
import useAuth from "../../auth/useAuth";

const Información = () => {

  const { user, actualizarUsuario} = useAuth();

  const [nombreActive, setNombreActive] = useState(false);
  const [contactoActive, setContactoActive] = useState(false);
  const [fechaActive, setFechaActive] = useState(false);
  const [lugarActive, setLugarActive] = useState(false);

  const [datos, setDatos] = useState({
    nombre: user.nombre,
    apellidos: user.apellidos,
    email: user.email,
    telefono: user.telefono,
    fecha_nacimiento: user.fecha_nacimiento,
    domicilio: user.domicilio,
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  }

  const actualizarDatos = (e) => {
    e.preventDefault();

    actualizarUsuario(datos);
  }
  
  return (
    <div className="contInformacionProfile">
      <div className="informacionProfile">

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

              {nombreActive ? (
                <section className="editar">
                  <form onSubmit={actualizarDatos} method="POST">
                    <label>Nombre o nombres</label>
                    <input type="text" placeholder="Nombre" name="nombre" onChange={handleChange} value={datos.nombre}/>
                    <label>Apellidos</label>
                    <input type="text" placeholder="Apellidos" name="apellidos" onChange={handleChange} value={datos.apellidos} />
                    <section className="botones">
                      <button onClick={() => setNombreActive(false)}>Cancelar</button>
                      <button type="submit" className="btnGuardar">Guardar Información</button>
                    </section>
                  </form>
                </section>
              ) : <p>{user.nombre} {user.apellidos}</p>}

            </section>
            {nombreActive ? (null) : (<button className="btnEditar" onClick={() => setNombreActive(true)}>Editar</button>)}
          </div>

          <div className="dato" >
            <section>
              <h3>Contacto</h3>

              {contactoActive ? (
                <section className="editar">
                  <form onSubmit={actualizarDatos} method="POST">
                    <label>Direccion de correo electrónico</label>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} value={datos.email} />
                    <label>Número de telefono</label>
                    <input type="text" placeholder="Teléfono" name="telefono" onChange={handleChange} value={datos.telefono} />
                    <section className="botones">
                      <button onClick={() => setContactoActive(false)}>Cancelar</button>
                      <button type="submit" className="btnGuardar">Guardar Información</button>
                    </section>
                  </form>
                </section>
              ) : <p>{user.email}</p>}
            </section>

            {contactoActive ? (null) : (<button className="btnEditar" onClick={() => setContactoActive(true)}>Editar</button>)}

          </div>
          <div className="dato" >
            <section>
              <h3>Fecha de nacimiento</h3>
              {fechaActive ? (
                <section className="editar">
                  <form onSubmit={actualizarDatos} method="POST">
                    <label>Fecha</label>
                    <input type={"date"} name="fecha_nacimiento" onChange={handleChange} value={datos.fecha_nacimiento} />
                    <section className="botones">
                      <button onClick={() => setFechaActive(false)}>Cancelar</button>
                      <button type="submit" className="btnGuardar">Guardar Información</button>
                    </section>
                  </form>
                </section>
              ) : <p>{user.fecha_nacimiento}</p>}

            </section>
            {fechaActive ? (null) : (<button className="btnEditar" onClick={() => setFechaActive(true)}>Editar</button>)}

          </div>
          <div className="dato" >
            <section>
              <h3>Lugar de residencia</h3>
              {lugarActive ? (
                <section className="editar">
                  <form onSubmit={actualizarDatos} method="POST">
                    <label>Escribe tu ciudad de recidencia</label>
                    <input type="text" placeholder="Dirección" name="domicilio" onChange={handleChange} value={datos.domicilio} />
                    <section className="botones">
                      <button onClick={() => setLugarActive(false)}>Cancelar</button>
                      <button type="submit" className="btnGuardar">Guardar Información</button>
                    </section>
                  </form>
                </section>
              ) : <p>{user.domicilio}</p>}

            </section>
            {lugarActive ? (null) : (<button className="btnEditar" onClick={() => setLugarActive(true)}>Editar</button>)}

          </div>
        </section>
      </div>
    </div>
  );
}

export default Información;