import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PrivateRoute = ({ children, rol }) => {
    const location = useLocation();

    const { isLogged, user } = useAuth();
    
    if (rol && user?.rol !== rol) return <Navigate to={'/dashboard/inicio'} />;

    if (!isLogged()) return <Navigate to={routes.login} state={{from: location}} />;
    return children;
};

export default PrivateRoute;