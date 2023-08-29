import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://lereacteur-vinted-api.herokuapp.com",
  baseURL: "http://localhost:3000",
});

export default apiClient;
