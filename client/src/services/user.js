import { userApi } from "./axios"

/**
 * Function Service, to check user token validation and get user data
 */

const userProfileApi = async (token) => {
   try {
      const response = await userApi.get("/profile", {
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


export {
   userProfileApi
}