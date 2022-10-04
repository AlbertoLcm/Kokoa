import axios from "axios";

const instance = axios.create({
  // * en producción
  // baseURL: "https://kokoa-server.herokuapp.com/api",
  // * en local
   baseURL: 'http://localhost:8081/api'
});

export default instance;
