import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://lereacteur-vinted-api.herokuapp.com",
});

export default apiClient;
