import React, { useRef } from "react";
import "../stylesheets/Buttons.css";
import Header from "../components/Header";
import "../stylesheets/SignUsuario.css";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

function SignUsuario() {
  const { signup } = useAuth();
  const location = useLocation();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();

  const [usuario, setUsuario] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    telefono: "",
    password: "",
  });

  const handleChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value
    });
  };

  const actionRegistrar = (e) => {
    e.preventDefault(); //esto previene que el form se mande.
    alertRef.current.classList.add('d-none');
    signup(usuario, location.state, alertRef)
  };

  return (
    <div className="contBackgroundRegistrar">
      <Header />
      <div id="ContenedorRegistrar">
        <div className="contenedorFormRegistrar">
          <h2>Crear cuenta nueva.</h2>
          <div ref={alertRef} className="alert d-none">
            Algo salio mal
          </div>

          <form onSubmit={actionRegistrar} method="POST" className="formRegistrar">
            <section className="nombre">
              <input name="nombre" onChange={handleChange} type="text" placeholder="Nombre" />
              <input name="apellidos" onChange={handleChange} type="text" placeholder="Apellidos" />
            </section>
            <section className="datos">
              <input name="email" onChange={handleChange} type="email" placeholder="Correo electrónico" />
              <input name="telefono" onChange={handleChange} type="text" placeholder="Número de teléfono (Opcional)" />
              <input name="password" onChange={handleChange} type="password" placeholder="Contraseña" />
            </section>
            <Link to={routes.login} className={"recuperarLink"}><p>¿Ya tienes una cuenta?</p></Link>

            <button type="submit" className="btnIngresar">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUsuario;
