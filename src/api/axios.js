import axios from "axios";

const instance = axios.create({
    // baseURL: 'https://kokoatec.herokuapp.com/api'
    baseURL: 'http://localhost:8081/api'
  });

export default instance;