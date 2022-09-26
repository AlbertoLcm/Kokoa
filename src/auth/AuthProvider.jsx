import axios from "axios";
import { React, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import roles from "../helpers/roles";

export const AuthContext = createContext()

export default function AuthProvider({ children }){

    const navigate = useNavigate();
    
    const [user, setUser] = useState(false);

    useEffect(() => {
        const islogin = () => {
            const token = localStorage.getItem('token');
            if(token){
                login(token)
                return;
            }
        }
        islogin();
    }, []);

    const login = (userCredentials, fromLocation) => {
        setUser(userCredentials)
        localStorage.setItem('token', userCredentials);
        if(fromLocation){
            navigate(fromLocation, {replace:true})
        }
    };
    
    const logout = () => {
        const token = localStorage.getItem('token')
        axios.put('http://localhost:8081/api/auth/logout',{'usuario':'prueba'}, {
            headers: {
                'authorization': token
            }
        } )
        .then((res) => {
            console.log(res);
            localStorage.removeItem('token')
            setUser(null)
        })
        .catch((err) => {
            console.log(err)
        })
    };

    const getUsuario = (token) => {
        let usuarioBD = {};
        axios.post('http://localhost:8081/api/auth/user',{'usuario':'prueba'}, {
            headers: {
                'authorization': token
            }
        } )
        .then((res) => {
            usuarioBD = res.data.data
        })
        .catch((err) => {
            console.log(err)
        })

        return usuarioBD
    };

    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        logout,
        getUsuario
    }
    
    return(
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    );
}