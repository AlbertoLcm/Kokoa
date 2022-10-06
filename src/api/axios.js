import axios from "axios";

const instance = axios.create({
  // * en producción
  baseURL: "https://kokoa-server.herokuapp.com/api",
  // * en local
  // baseURL: 'http://localhost:8081/api'
});

instance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
instance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
export default instance;
