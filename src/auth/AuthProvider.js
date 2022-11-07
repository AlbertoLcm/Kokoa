import {
  React,
  createContext,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import instance from "../api/axios";
import routes from "../helpers/routes";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(false);
  const [eventos, setEventos] = useState(null);

  const isLogged = () => !!user;
  
  const islogin = () => {
    const token = localStorage.getItem("token");
    instance
      .post(
        "/auth",
        { usuario: "prueba" },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((usuarioRes) => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("token");
        navigate(routes.login);
      });
  };

  const loginCargo = (cargo) => {
    localStorage.removeItem("token");
    instance
    .post("/auth/login/cargo", cargo)
    .then((usuarioRes) => {
      console.log(usuarioRes);
      setUser(usuarioRes.data.user.data);
      localStorage.setItem("token", usuarioRes.data.user.token);
      navigate(routes.home);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  
  const login = (usuario, fromLocation, alertRef) => {
    instance
      .post("/auth/login", usuario)
      .then((usuarioRes) => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
        if (fromLocation) {
          navigate(fromLocation, { replace: true });
        }
      })
      .catch((error) => {
        alertRef.current.classList.remove('d-none');
        alertRef.current.innerHTML = error.response.data.message;
      });
  };

  const signup = (usuario, rol, fromLocation, alertRef) => {
    instance
      .post(`${rol}/signup`, usuario)
      .then((usuarioRes) => {
        console.log(usuarioRes)
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
        if (fromLocation) {
          navigate(fromLocation, { replace: true });
        }
      })
      .catch((error) => {
        alertRef.current.classList.remove('d-none');
        alertRef.current.innerHTML = error.response.data.message;
      });
  };

  const logout = () => {
    const token = localStorage.getItem("token");
    instance
      .put(
        "/auth/logout",
        { usuario: "prueba" },
        {
          headers: {
            authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("token");
        setUser(null);
        navigate(routes.login);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hasRole = (role) => user?.role === role;

  const [marcar, setMarcar] = useState(null);

  const asignarMarcar = (id) => {
    setMarcar(id);
  };
  const addEventos = (eventos) => {
    setEventos(eventos);
  };

  const [mostrar, setMostrar] = useState(null);

  const addMostrar = (res) => {
    setMostrar(res);
  };

  const contextValue = {
    user,
    hasRole,
    setUser,
    isLogged,
    login,
    signup,
    logout,
    asignarMarcar,
    marcar,
    eventos,
    addEventos,
    mostrar,
    addMostrar,
    islogin,
    loginCargo
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
