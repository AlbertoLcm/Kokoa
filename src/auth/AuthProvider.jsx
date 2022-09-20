import { React, createContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import roles from "../helpers/roles";

export const AuthContext = createContext()

export default function AuthProvider({ children }){

    const navigate = useNavigate();
    
    const [user, setUser] = useState(false);

    const login = (userCredentials, fromLocation) => {
        setUser({id:1, role:roles.artista})
        if(fromLocation){
            navigate(fromLocation, {replace:true})
        }
    };
    const logout = () => setUser(false);

    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout
    }
    
    return(
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    );
}