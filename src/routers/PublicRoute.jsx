import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PublicRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isLogged } = useAuth();
    if (isLogged()) return <Navigate to={routes.home} />;
    return children;
};

export default PublicRoute;