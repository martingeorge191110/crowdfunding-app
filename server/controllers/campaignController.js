import Stripe from "stripe"
import prisma from "../prisma/prisma.js"
import { resSuccCamp } from "../Utilis/campaignUtility.js"
import { createError } from "../Utilis/createError.js"
import { PrismaClient } from "@prisma/client"

/**
 * createCampaign Controller, for create new campagin
 * 
 * Description:
 *             [1] -->
 */

const createCampaign = async (req, res, next) => {
   const { id } = req
   const {name, description, goal, status, category,
      startDate, endDate, paypalEmail
   } = req.body


   try {
      const campaign = await prisma.campaign.create({
         data: {
            name: name,
            description: description,
            goal: goal,
            status: status,
            category: category,
            startDate: startDate,
            endDate: endDate,
            userId: id,
            paypalEmail: paypalEmail
         }
      })
      console.log(campaign)
      const resObj = {
         ...campaign
      }
      return (resSuccCamp(res, 201, "Operation, Successfuly", "New Campaign Created", resObj))
   } catch (err) {
      return (next(createError("Something went wrong during creating new Campaign", 500)));
   }
}

/**
 * retriveUserCampaign Controller, for retrieving all user Campaignes
 * 
 * Description:
 *             [1] --> get user id after verify token
 *             [2] --> Check whether user has Campaign to retrieve or not and response
 */

const retriveUserCampaign = async (req, res, next) => {
   const {id} = req

   try {
      const userCampaignes = await prisma.campaign.findMany({
         where: {userId: id}
      })

      if (!userCampaignes)
         return (next(createError("No Campaigns Exist", 404)))

      return (resSuccCamp(res, 200, "Operation, Successfuly", "User Campaigns Found!", userCampaignes))
   } catch (err) {
      return (next(createError("Something went wrong during retrieving Campaignes", 500)))
   }
}

/**
 * searchCampaign Controller
 * 
 * Description:
 *             [1] --> Get user query
 *             [2] --> Searching whether Campaignes Exist or not and response
 */

const searchCampaign = async (req, res, next) => {
   const query = req.query

   try {
      const campaign = await prisma.campaign.findMany({
         where: {
            ...query
         }
      })
      
      if (!campaign)
         return (next(createError("No Campaignes with your Requirments!", 404)))

      return (resSuccCamp(res, 200, "Operation, Successfuly", "Retrieved Successfuly!", campaign))
   } catch (err) {
      return (next(createError("Something went wrong during Campaign Retrieving!", 500)))
   }
}

/**
 * deleteCampaign Controller
 * 
 * Description:
 *             [1] --> Get campaign id from query
 *             [2] --> Delete the Campaign and response
 */

const deleteCampaign = async (req, res, next) => {
   const {id} = req.query

   try {
      await prisma.campaign.delete({
         where: {id: id}
      })

      return (resSuccCamp(res, 200, "Operation Successfuly", "Cmpaign Deleted Succefuly", null))
   } catch (err) {
      return (next(createError("Cannot Delete this Campaign!", 500)))
   }
}

/**
 * updateCampaign Controller
 * 
 * Descriptiom:
 *             [1] --> Get campaign id and new information from user
 *             [2] --> Check whether this Campaign exist or not, then update and resposne
 */

const updateCampaign = async (req, res, next) => {
   const {id} = req.query
   const body = req.body

   try {
      const campaign = await prisma.campaign.update({
         where: {id:id},
         data: {
            ...body
         }
      })

      if (!campaign)
         return (next(createError("Campaign is not exist!", 404)))

      return (resSuccCamp(res, 201, "Operation, Successfuly", "Campaign Updated Succesfuly", campaign))
   } catch (err) {
      return (next(createError("Something Went Wrong during updating Campaign infomration", 500)))
   }
}


export {createCampaign, retriveUserCampaign, searchCampaign, deleteCampaign, updateCampaign}
