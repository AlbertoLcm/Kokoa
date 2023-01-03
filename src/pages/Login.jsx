import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import Header from "../components/Header";
import Loading from "../components/loadings/Loading";
import routes from "../helpers/routes";
import "../stylesheets/Login.css";

function Login() {

  const { login, islogin } = useAuth();
  const location = useLocation();

  const [error, setError] = useState({
    email: false,
    password: false,
    error: false
  });
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
    setError({
      email: false,
      password: false,
      error: false,
    });
    login(userCredentials, location.state, setError)
  };

  return (
    <>
      <div className="contImagen">
        <Header />
        <div className="contDegradado">
          <div className="contLogin">
            <div className="login">
              <h2>Bienvenido</h2>
              <div className={error.error ? "alert" : "alert d-none"}>
                Algo salio mal, intenta de nuevo más tarde.
              </div>
              <form onSubmit={actionLogear} method="POST" className="form-group">
                <input
                  className={error.email ? "dato error" : "dato"}
                  name="email"
                  type="text"
                  onChange={handleChange}
                  value={userCredentials.email}
                  placeholder="Correo ó Número de teléfono"
                />
                {error.email && <p className="errorText">El correo o el número de teléfono no existe</p>}
                <input
                  className={error.password ? "dato error" : "dato"}
                  name="password"
                  type="password"
                  onChange={handleChange}
                  value={userCredentials.password}
                  placeholder="Contraseña"
                />
                {error.password && <p className="errorText">La contraseña es incorrecta</p>}

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
