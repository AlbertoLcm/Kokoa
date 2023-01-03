import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PrivateRoute = ({ children, Role }) => {
    const location = useLocation();

    const { isLogged, user } = useAuth();
    
    if (Role && user?.Role !== Role) return <Navigate to={routes.home} state={{from: location}} />;

    if (!isLogged()) return <Navigate to={routes.login} state={{from: location}} />;
    return children;
};

export default PrivateRoute;