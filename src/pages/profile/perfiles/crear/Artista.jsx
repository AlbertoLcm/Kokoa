import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../../../api/axios";
import useAuth from "../../../../auth/useAuth";

const Artista = () => {

  const navigation = useNavigate();

  const { user } = useAuth();

  const [artista, setArtista] = useState({
    propietario: user.id,
    nombre: "",
    categoria: "",
    descripcion: "",
  });

  const handleChange = (e) => {
    setArtista({
      ...artista,
      [e.target.name]: e.target.value,
    });
  };

  const crear = (e) => {
    e.preventDefault(); //esto previene que el form se mande.
    
    instance.post('/cargos/artista', artista)
    .then((registro) => {
      // navigate('/perfil/perfiles/cuentas')
      console.log(registro.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }
  
  return (
    <section className="contCrearCuenta">
      <button onClick={() => navigation(-1)} className="btnBack">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="30" height="30" viewBox="0 0 24 24" stroke-width="1.5" stroke="#f3f3f3" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <line x1="5" y1="12" x2="19" y2="12" />
          <line x1="5" y1="12" x2="11" y2="18" />
          <line x1="5" y1="12" x2="11" y2="6" />
        </svg>
      </button>

      <section className="image artista">
        <div className="background"></div>
      </section>

      <section className="tarjeta">
        <div className="titulo">
          <h1>Crear una cuenta.</h1>
          <h2>Tipo artista</h2>
        </div>
        <div className="descripcion">
          <p>
            Si eres cantante, comediante, bailarín, etc.
            y quieres promocionarte, puedes crear una cuenta
            de tipo artista y participar en eventos.
          </p>
        </div>
        <form className="formCrearCuenta" onSubmit={crear} method="POST">
          <div className="alerta d-none">
            Algo salio mal
          </div>
          <input autoComplete="off" name="nombre" type="text" placeholder="¿Cúal es tu nombre?" onChange={handleChange} />
          <input autoComplete="off" name="categoria" type="text" placeholder="Categoria" onChange={handleChange} />
          <p>Escribe brevemente que es lo que haces.</p>
          <textarea name="descripcion" placeholder="Descripción (Opcional)" onChange={handleChange} />
          <button type="submit" className="btnIngresar">Crear artista</button>
        </form>
      </section>
    </section>
  );
}

export default Artista;