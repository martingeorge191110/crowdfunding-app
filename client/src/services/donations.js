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


/**
 * Function Service, donation process
 */

const donateApi = async (token, campaignId, amount) => {
   try {
      const response = await donationApi.post(`/?campaignId=${campaignId}`, {
         amount: amount
      }, {
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
 * Function Service, campaigns notifications
 */

const donationsNotificationsApi = async (token) => {
   try {
      const response = await donationApi.get("/notifications", {
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
 * Function Service, See notifications related to donations
 */

const seeNotificationsApi = async (token) => {
   try {
      const response = await donationApi.put("/notifications",{
         
      }, {
         headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type" :"application/json"
         }
      })

      return (response.data)
   } catch (err) {
      console.log(err.response.data)
      return (err.response.data)
   }
}


export {
   retrieveDonsApi,
   allUserDonsApi,
   donateApi,
   donationsNotificationsApi,
   seeNotificationsApi
}
