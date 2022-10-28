import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../auth/useAuth";
import routes from "../helpers/routes";

const PublicRoute = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isLogged } = useAuth();
    console.log(location);

    if (isLogged()) return <Navigate to={routes.home} />;
    return children;
};

export default PublicRoute;