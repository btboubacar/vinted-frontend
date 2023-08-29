import axios from "axios";

const apiClient = axios.create({
  // baseURL: "https://lereacteur-vinted-api.herokuapp.com",
  // baseURL: "http://localhost:3000",
  baseURL: "https://site--vinted-backend--25428jw7g85y.code.run",
});

export default apiClient;
