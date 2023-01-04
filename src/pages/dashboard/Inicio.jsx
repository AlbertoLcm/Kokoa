import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../auth/useAuth";
import MapNegocio from "../../components/maps/MapNegocio";
import "../../stylesheets/pages/Dashboard.css";

const Inicio = () => {

  const { user } = useAuth();
  
  return (
    <div className="contDashboardInicio">
      <MapNegocio />
    </div>
  );
}

export default Inicio;