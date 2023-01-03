import {
  React,
  createContext,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "../api/axios";
import routes from "../helpers/routes";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [eventosTranscurso, setEventosTranscurso] = useState([]);

  useEffect(() => {
    islogin();
  }, []);

  const isLogged = () => !!user;

  const actionBackLogin = () => {
    localStorage.removeItem("token");
    instance.post('auth/login/back', { id: user.id_user })
      .then(usuarioRes => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
        navigate(routes.home);
      })
      .catch(err => console.log(err));
  }

  const islogin = () => {
    const token = localStorage.getItem("token");
    instance.post("/auth", { usuario: "prueba" }, { headers: { authorization: token, } })
      .then((usuarioRes) => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
      })
      .catch((err) => {
        localStorage.removeItem("token");
        navigate(location.pathname);
      });
  };

  const loginCargo = (cargo) => {
    localStorage.removeItem("token");
    instance.post("/auth/login/cargo", cargo)
      .then((usuarioRes) => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
        navigate('/dashboard/inicio');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const login = (usuario, fromLocation, setError) => {
    instance
      .post("/auth/login", usuario)
      .then((usuarioRes) => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
        if (fromLocation) {
          navigate(fromLocation.from, { state: { pagina: fromLocation.pagina } });
        }
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const resetPasswordLogin = (id) => {
    instance
      .post("/auth/resetpassword", { id: id })
      .then((usuarioRes) => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
        navigate(routes.home);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signup = (usuario, fromLocation, alertRef) => {
    instance.post(`/usuarios/signup`, usuario)
      .then((usuarioRes) => {
        setUser(usuarioRes.data.user.data);
        localStorage.setItem("token", usuarioRes.data.user.token);
        if (fromLocation) {
          navigate(fromLocation.from, { state: { pagina: fromLocation.pagina } });
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
      .put("/auth/logout", { usuario: "prueba" }, {
        headers: {
          authorization: token,
        }
      })
      .then((res) => {
        localStorage.removeItem("token");
        setUser(null);
        navigate(routes.login);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const actionShowChat = (boolean) => {
    setShowChat(boolean);
  }

  const hasRole = (role) => user?.role === role;

  const [marcar, setMarcar] = useState(null);

  const asignarMarcar = (id) => {
    setMarcar(id);
  };
  const addEventos = (eventos) => {
    setEventos(eventos);
  };

  const addEventosTranscurso = (eventos) => {
    setEventosTranscurso(eventos);
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
    actionBackLogin,
    loginCargo,
    resetPasswordLogin,
    eventosTranscurso, setEventosTranscurso, addEventosTranscurso,
    actionShowChat, showChat
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
