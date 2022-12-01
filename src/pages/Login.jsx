import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import Loading from "../components/loadings/Loading";
import Modal from "../components/modals/Modal";
import routes from "../helpers/routes";
import "../stylesheets/Login.css";

function Login() {
  const { login, islogin } = useAuth();
  const location = useLocation();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();

  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserCredentials({
      ...userCredentials,
      [e.target.name]: e.target.value,
    });
  };

  if (localStorage.getItem("token")) {
    islogin();
    return <Loading />;
  }

  const actionLogear = (e) => {
    e.preventDefault(); //esto previene que el form se mande.
    alertRef.current.classList.add('d-none');
    login(userCredentials, location.state, alertRef)
  };

  return (
    <>
      <div className="contImagen">
        <Header />
        <div className="contDegradado">
          <div className="contLogin">
            <div className="login">
              <h2>Bienvenido</h2>
              <div ref={alertRef} className="alert d-none">
                Algo salio mal
              </div>
              <form onSubmit={actionLogear} method="POST" className="form-group">
                <input
                  id="email"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  value={userCredentials.email}
                  placeholder="Correo ó Número de teléfono"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={userCredentials.password}
                  placeholder="Contraseña"
                />

                <Link to={routes.recuperar} className={"recuperarLink"}><p>¿Olvidaste tu contraseña?</p></Link>

                <button type="submit" className="btnIngresar">
                  Ingresar
                </button>

              </form>
              <section className="separador">
                <div className="letra">Ó</div>
              </section>
              <Link to={routes.newusuario}>
                <button className="btnCrear">
                  Crear Cuenta
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
