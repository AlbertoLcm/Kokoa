import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'
import icon from '../images/iconRetroceso.png'

function Header({ tipo, user, volver }) {
  const nav = useNavigate();

  return (
    <header className={tipo}>
      <section className="contLogo">
        <div className="logo">Kokoa</div>
      </section>
      {volver && <span className="btnVolver" onClick={() => nav(-1)}> <img src={icon} /> </span>}
      <div className="userHeader">
        {user}
      </div>
    </header>
  );
}

export default Header;