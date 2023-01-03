import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../api/axios";
import useAuth from "../../../../auth/useAuth";

const Patrocinio = () => {

  const navigation = useNavigate();

  const { user } = useAuth();
  
  const [patrocinador, setPatrocinador] = useState({
    propietario: user.id,
    nombre: "",
    categoria: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setPatrocinador({
      ...patrocinador,
      [e.target.name]: e.target.value,
    });
  };

  const crear = (e) => {
    e.preventDefault(); //esto previene que el form se mande.
    instance.post('/cargos/patrocinador', patrocinador)
    .then((registro) => {
      navigation('/perfil/perfiles')
      console.log(registro.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <section className="contCrearCuenta">
      <button onClick={() => navigation(-1)} className="btnBack">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="11" y2="18" />
          <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
      </button>

      <section className="image patrocinio">
        <div className="background"></div>
      </section>

      <section className="tarjeta">
        <div className="titulo">
          <h1>Crear una cuenta.</h1>
          <h2>Tipo patrocinio</h2>
        </div>
        <div className="descripcion">
          <p>
            ¿Deseas promocionar tu marca con grandes
            negocios?, puedes crear una cuenta de tipo
            patrocinador y participar en eventos.
          </p>
        </div>
        <form className="formCrearCuenta" onSubmit={crear} method="POST">
          <div className="alerta d-none">
            Algo salio mal
          </div>
          <input autoComplete="off" name="nombre" onChange={handleChange} type="text" placeholder="Nombre de tu marca" />
          <input autoComplete="off" name="categoria" onChange={handleChange} type="text" placeholder="Categoria" />
          <p>Escribe brevemente que es lo que haces.</p>
          <textarea name="descripcion" onChange={handleChange} placeholder="Descripción (Opcional)" />
          <button type="submit" className="btnIngresar">Crear patrocinio</button>
        </form>
      </section>
    </section>
  );
}

export default Patrocinio;