import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PrivateRoute = ({ children, Role }) => {
    const location = useLocation();

    const { hasRole, isLogged, user } = useAuth();
    
    if(Role && user.rol !== Role) return <Navigate to={routes.home} />;

    if (!isLogged()) return <Navigate to={routes.login} state={{from: location}} />;
    return children;
};

export default PrivateRoute;