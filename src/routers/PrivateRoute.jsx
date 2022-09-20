import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PrivateRoute = ({ children, Role }) => {
  
    // const user = false;
    
    const { hasRole, isLogged } = useAuth();

    if (Role && !hasRole(Role)) return <Navigate to={routes.home} />;

    if (!isLogged()) return <Navigate to={routes.login} />;
    return children;
};

export default PrivateRoute;