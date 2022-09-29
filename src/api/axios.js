import axios from "axios";

const instance = axios.create({
  // en producción
    baseURL: 'https://kokoa-api.herokuapp.com/api'
    // baseURL: 'http://localhost:8081/api' 
  });

export default instance;