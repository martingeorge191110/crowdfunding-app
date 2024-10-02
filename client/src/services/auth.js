import { authApi } from "./axios.js";

/**
 * Function Services, Login Process and store reponse data
 */

const loginApi = async (email, password) => {
   try {
      const response = await authApi.post(
         "/login",
         { email, password },
      );

      const data = response.data
      return (data)
   } catch (err) {
      return (err.response.data)
   }
};

/**
 * Function Services, Registeration Process
 */

const registerApi = async (body) => {
   try {
      const response = await authApi.post(
         "/register",
         body
      );

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export {
   loginApi,
   registerApi
}