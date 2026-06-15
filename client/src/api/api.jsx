import axios from "axios";


const API = axios.create({

  // local development
  baseURL: "http://localhost:5000/api",

  

});


export default API;
