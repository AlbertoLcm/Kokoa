import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'
import icon from '../images/iconRetroceso.png'
import routes from "../helpers/routes";

function Header({ tipo, user, volver }) {
  const nav = useNavigate();

  return (
    <header className={tipo}>
      <section className="contLogo" onClick={() => nav(routes.home)}>
        <div className="logo" >Kokoa</div>
      </section>
      {volver && <span className="btnVolver" onClick={() => nav(-1)}> <img src={icon} /> </span>}
      <div className="userHeader">
        {user}
      </div>
    </header>
  );
}

export default Header;