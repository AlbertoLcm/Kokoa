import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  
    const user = false;

    // const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;
    return children;
};

export default PrivateRoute;