import { donationApi } from "./axios"

/**
 * Function Service, retrieve specific Campaign Dontaions
 */

const retrieveDonsApi = async (token, campaignId) => {
   try {
      const response = await donationApi.get(`/?campaignId=${campaignId}`, {
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
 * Function Service, Retrieve all user donations
 */

const allUserDonsApi = async (token) => {
   try {
      const response = await donationApi.get("/user", {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
         }
      })

      return (response.data)
   } catch (err){
      return (err.response.data)
   }
}

export {
   retrieveDonsApi,
   allUserDonsApi
}
