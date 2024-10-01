import prisma from "../prisma/prisma.js";
import { respSuccess } from "../Utilis/authUtility.js";
import { createError } from "../Utilis/createError.js";
import { retriveUserCampaign } from "./campaignController.js";


/**
 * donate Controller
 * 
 * Description:
 *             [1] --> get user id, camp id and amount after verfying user token
 *             [2] --> create Donation
 */

const donate = async (req, res, next) => {
   const {id} = req
   const {campaignId} = req.query
   const {amount} = req.body

   try {
      const donation = await prisma.donation.create({
         data: {
            campaignId, userId: id, amout: Number(amount)
         }
      })

      await prisma.campaign.update({
         where: {id: campaignId},
         data: {
            currentAmount: {
               increment: Number(amount)
            }
         }
      })

      return (respSuccess(res, 201, "Operation, Successed!", "Donation process, Done!", donation))
   } catch (err) {
      return (next(createError("Something went wrong while Dontation Process", 500)))
   }
}

/**
 * viewDonations, This Controller aim to View all donations for user Campaign,
 *                this authorized to User who has the authority of this Campaign
 *
 * Description:
 *             [1] --> get user id and CampaignId after verifying user token
 *             [2] --> Check if this Campaign exists or not, to avoid any Errors
 *             [3] --> Check Donations for this Campaign and response
 */

const viewDonations = async (req, res, next) => {
   const {id} = req
   const {campaignId} = req.query

   try {
      /* user campaign */
      const campaign = await prisma.campaign.findUnique({
         where: {userId: id, id: campaignId}
      })

      if (!campaign)
         return (next(createError("No Campaigns Found!", 404)))

      /* Array of Donations */
      const donations = await prisma.donation.findMany({
         where: {
            campaignId: campaign.id
         },
         select: {
            id: true,
            amout: true,
            userId: true
            , author: {
               select: {
                  f_name: true, l_name: true, gender: true, avatar: true, email: true
               }
            }
         }
      })

      if (!donations || donations.length === 0)
         return (next(createError("No Donations Yet!", 404)))

      const result = donations.map((donation) => {
         return ({
            id: donation.id, userId: donation.userId, amount: donation.amout, ...donation.author
         })
      })

      return (respSuccess(res, 200, "Operation, Successed!", "Finding Users donated this Campaign Process, Done!", result))
   } catch (err) { 
      return (next(createError("Something went wrong while Viewing Donations", 500)))
   }
}

export {
   donate,
   viewDonations
}