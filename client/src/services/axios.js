import axios from "axios";

const authApi = axios.create({
   baseURL: "http://localhost:8000/api/auth",
   withCredentials: true
});


export {
   authApi
}
