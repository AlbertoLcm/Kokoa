import React, { useRef } from "react";
import { Link } from "react-router-dom";
import instance from "../../api/axios";
import Header from "../../components/Header";
import routes from "../../helpers/routes";
import "../../stylesheets/pages/Recuperar.css";

function Recuperar() {
  
  const [datos, setDatos] = React.useState({
    email: "",
  })
  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();
  const successRef = useRef();

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  const actionRecuperar = () => {
    instance.post("/usuarios/recuperar", datos)
      .then((respuesta) => {
        alertRef.current.classList.add('d-none');
        successRef.current.classList.remove('d-none');
        successRef.current.innerHTML = respuesta.data.message;
      })
      .catch((error) => {
        console.log(error);
        alertRef.current.classList.remove('d-none');
        alertRef.current.innerHTML = error.response.data.message;
      });
  };
  
  return (
    <div className="contBackground">
      <Header>
        <Link to={routes.login} className="btnLink">
          Iniciar Sesión
        </Link>
      </Header>

      <div id="ContRecuperar">
        <section className="formRecuperar">
          <h2>Cambia tu contraseña</h2>
          <p>Ingresa tu correo para cambiar tu contraseña</p>
          <div ref={alertRef} className="alert d-none">
            Algo salio mal
          </div>
          <div ref={successRef} className="success d-none">
            Todo correcto
          </div>
          <input type="email" name="email" onChange={handleChange} />
          <button onClick={() => actionRecuperar()}>Buscar</button>
        </section>
      </div>

    </div>
  );
}

export default Recuperar;