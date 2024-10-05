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

/**
 * Function Service, searching for Cmapaigns
 */

const searchCampaignApi = async (token, query) => {
   try {
      const response = await campApi.get(`/search/?${query}`,{
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

/**
 * Function Service, that puase the campaiang from recieving money
 */

const updateCmapApi = async (token, campId, stat) => {
   let body = {
      status: stat
   }
   try {
      const response = await campApi.put(`?id=${campId}`, body, {
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
   userCampsApi,
   createCamp,
   searchCampaignApi,
   updateCmapApi
}
