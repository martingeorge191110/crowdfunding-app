import { campApi } from "./axios"

/**
 * Function Service, Get all user Campagins
 */

const userCampsApi = async (token) => {
   try {
      const response = await campApi.get('/', {
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
 * Function Service, create new Campaign
 */

const createCamp = async (token, body) => {
   try {
      const response = await campApi.post("/", 
         body, {
            headers: {
               Authorization: `Bearer ${token}`,
               "Content-Type": "application/json"
            }
         }
      )

      return (response.data)
   } catch (err) {
      return (err.response.data)
   }
}

export {
   userCampsApi,
   createCamp
}
