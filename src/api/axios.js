import axios from "axios";

const instance = axios.create({
  // En producción
  baseURL: "https://koko-server.fly.dev/api"
  // En local
  // baseURL: 'http://localhost:8080/api'
});

export default instance;