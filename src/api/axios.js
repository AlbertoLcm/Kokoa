import axios from "axios";

const instance = axios.create({
  // * en producción
  baseURL: "https://kokoa-api.onrender.com/api"
  // * en local
  // baseURL: 'http://localhost:8080/api'
});

export default instance;