import { React, createContext, useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import instance from "../api/axios";
import roles from "../helpers/roles";

export const AuthContext = createContext()

export default function AuthProvider({ children }){

    const navigate = useNavigate();
    
    const [user, setUser] = useState(false);
    const [eventos, setEventos] = useState(null)

    useEffect(() => {
        const islogin = () => {
            const token = localStorage.getItem('token');
            instance.post('/auth',{'usuario':'prueba'}, {
                headers: {
                    'authorization': token
                }
            } )
            .then((usuarioRes) => {
                setUser(usuarioRes.data.user)
                    localStorage.setItem('token', usuarioRes.data.user.token);
            })
        }
        islogin();
    }, []);

    const login = (usuario, fromLocation) => {
        instance.post('/auth/login', usuario)
                .then((usuarioRes) => {
                    setUser(usuarioRes.data.user)
                    localStorage.setItem('token', usuarioRes.data.user.token);
                    if(fromLocation){
                        navigate(fromLocation, {replace:true})
                    }
                })
                .catch((err) => {
                    alert(err.response.data.message)
                })
    };

    const signup = (usuario, rol, fromLocation) => {
        instance.post(`${rol}/signup`, usuario)
                .then((usuarioRes) => {
                    setUser(usuarioRes.data.user)
                    localStorage.setItem('token', usuarioRes.data.user.token);
                    if(fromLocation){
                        navigate(fromLocation, {replace:true})
                    }
                })
                .catch((error) => {
                    alert(error.response.data.message);
                });
    }
    
    const logout = () => {
        const token = localStorage.getItem('token')
        instance.put('/auth/logout',{'usuario':'prueba'}, {
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
    
    const isLogged = () => !!user;
    const hasRole = (role) => user?.role === role;

    const [marcar, setMarcar] = useState(null);

    const asignarMarcar = (id) => {

        setMarcar(id)

    }
    const addEventos = (eventos) => {
        setEventos(eventos);
    }

    const [mostrar, setMostrar] = useState(null);
     
    const addMostrar = (res) => {
        setMostrar(res)
    }

    const contextValue = {
        user,
        isLogged,
        hasRole,
        login,
        signup,
        logout,
        asignarMarcar,
        marcar,
        eventos,
        addEventos,
        mostrar,
        addMostrar
    }
    
    return(
        <AuthContext.Provider value={ contextValue }>
            { children }
        </AuthContext.Provider>
    );
}