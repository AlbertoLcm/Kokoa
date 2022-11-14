import axios from "axios";

const instance = axios.create({
  // * en producción
  baseURL: "https://koko-server.fly.dev/api"
  // * en local
  // baseURL: 'http://localhost:8080/api'
});

export default instance;