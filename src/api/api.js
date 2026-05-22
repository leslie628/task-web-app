import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
// const API_LOCAL="https://taskmanager-api-cxl8.onrender.com";
const API = axios.create({
  baseURL: API_BASE,
  withCredentials:true
});

export default API;