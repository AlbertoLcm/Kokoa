import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../stylesheets/Header.css'
import icon from '../images/iconRetroceso.png'
import routes from "../helpers/routes";

function Header({ tipo, user, children }) {
  const nav = useNavigate();

  return (
    <header className={tipo}>
      <section className="contLogo" onClick={() => nav(routes.home)}>
        <div className="logo" id="" >Kokoa</div>
      </section>
      <div className="userHeader">
        {children}
        {user}
      </div>
    </header>
  );
}

export default Header;