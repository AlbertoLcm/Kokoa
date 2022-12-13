import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import instance from "../../api/axios";
import useAuth from "../../auth/useAuth";

const NewPassword = () => {
  // Obtenemos las variables de la URL
  const { id, token } = useParams();
  const { resetPasswordLogin } = useAuth();

  /** @type React.MutableRefObject<HTMLInputElement> */
  const alertRef = useRef();

  const [datos, setDatos] = React.useState({
    password: ""
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    });
  };

  const actionGuardar = () => {
    instance.post(`/usuarios/resetpassword/${id}/${token}`, datos)
      .then((respuesta) => {
        resetPasswordLogin(id);
      })
      .catch((error) => {
        console.log(error);
        alertRef.current.classList.remove('d-none');
        alertRef.current.innerHTML = error.response.data.message;
      });
  };
  
  return (
    <div className="contBackground">
      <div id="ContRecuperar">
        <section className="formRecuperar">
          <h2>Nueva contraseña</h2>
          <p>Ingresa una contraseña segura y guardala en un lugar seguro</p>
          <div ref={alertRef} className="alert d-none">
            Algo salio mal, intenta de nuevo más tarde
          </div>
          <input type="password" name="password" onChange={handleChange} />
          <button onClick={() => actionGuardar()}>Recuperar Contraseña</button>
        </section>
      </div>
    </div>
  );
}

export default NewPassword;