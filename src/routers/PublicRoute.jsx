import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PublicRoute = ({ children }) => {
    const { isLogged } = useAuth();
    if (isLogged()) return <Navigate to={routes.home} />;
    return children;
};

export default PublicRoute;