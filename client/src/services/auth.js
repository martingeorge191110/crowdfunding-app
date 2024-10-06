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

/**
 * Function Services, send Generated Code
 */

const sendCodeApi = async (email) => {
   try {
      const response = await authApi.post(
         "/gencode",
         {email}
      );

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

/**
 * Function Services, to check the code verification, then continue reset password process
 */

const resetPassApi = async (bodyObject) => {
   try {
      const response = await authApi.put(
         "/passreset", bodyObject
      );

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

/**
 * Function service, check token validation
 */

const verifyToken = async (token) => {
   try {
      const response = await authApi.get("/login", {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

/**
 * Function Service, logout process
 */

const logOutApi = (token) => {
      const response = authApi.post("/logout", {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
            
         }
      })

      return (response.data)
}

export {
   loginApi,
   registerApi,
   sendCodeApi,
   resetPassApi,
   verifyToken,
   logOutApi
}