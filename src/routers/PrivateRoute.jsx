import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PrivateRoute = ({ children, Role }) => {
    const location = useLocation(); 
  
    // const user = false;
    
    const { hasRole, isLogged } = useAuth();

    if (Role && !hasRole(Role)) return <Navigate to={routes.home} />;

    if (!isLogged()) return <Navigate to={{ pathname: routes.login, state:{ from: location}}} />;
    return children;
};

export default PrivateRoute;