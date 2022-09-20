import { React, createContext, useState} from "react";
import roles from "../helpers/roles";

export const AuthContext = createContext()

export default function AuthProvider({ children }){

    const [user, setUser] = useState(false);

    const login = () => setUser({id:1, role:roles.artista});
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