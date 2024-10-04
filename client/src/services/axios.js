import axios from "axios";

const authApi = axios.create({
   baseURL: "http://localhost:8000/api/auth",
   withCredentials: true
});

const userApi = axios.create({
   baseURL: "http://localhost:8000/api/users",
   withCredentials: true
});

const campApi = axios.create({
   baseURL: "http://localhost:8000/api/campaigns",
   withCredentials: true
});

const donationApi = axios.create({
   baseURL: "http://localhost:8000/api/donation",
   withCredentials: true
});

export {
   authApi,
   userApi,
   campApi,
   donationApi
}
