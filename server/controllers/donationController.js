import prisma from "../prisma/prisma.js";
import { respSuccess } from "../Utilis/authUtility.js";
import { createError } from "../Utilis/createError.js";


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

   if (Number(amount) < 5)
      return (next(createError("Cannot Donate with amount less than $5", 409)))

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
 * viewDonations, This Controller aim to View all donations for one user Campaign,
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
            userId: true,
            createdAt: true
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
            id: donation.id, createdAt: donation.createdAt, userId: donation.userId, amount: donation.amout, ...donation.author
         })
      })

      return (respSuccess(res, 200, "Operation, Successed!", "Finding Users donated this Campaign Process, Done!", result))
   } catch (err) { 
      return (next(createError("Something went wrong while Viewing Donations", 500)))
   }
}

/**
 * viewDonations, This Controller aim to View all Campaign donations status,
 *                which not seen by campaign author
 *
 * Description:
 *             [1] --> get user id after verify token
 *             [2] --> check whether any donations did not be seen by campaign author or not
 *             [3] --> Reponse
 */

const DonationsSeenByAuhor = async (req, res, next) => {
   const {id} = req

   try {
      const donations = await prisma.donation.findMany({
         where: {
            campaign: {
               userId: id,
            },
            seenByAuthor: false
         },
         select: {
            amout: true,
            campaign: {
               select: {
                  name: true
               }
            },
            author: {
               select: {
                  id: true,
                  f_name: true,
                  l_name: true,
                  email: true
               }
            },
            createdAt: true,
            seenByAuthor: true
         }
      })

      if (!donations, donations.length === 0)
         return (next(createError("No natification sent yet!", 200)))

      const result = donations.map((donation) => {
         return ({
            amount: donation.amout, createdAt: donation.createdAt, seenByAuthor: donation.seenByAuthor,
            ...donation.author, ...donation.campaign
         })
      })

      return (respSuccess(res, 200, "Operation, Successed!", "New Notification!", result))
   } catch (err) {
      return (next(createError("Something went wrong!", 500)))
   }
}

/**
 * updateSeenByAuthor, Controller to update notification status after user seen the dons
 * 
 * Description:
 *             [1] --> get user id after verify token
 *             [2] --> check whether any donations did not be seen by campaign author or not and update it
 *             [3] --> Reponse
 */

const updateSeenByAuthor = async (req, res, next) => {
   const {id} = req

   try {
      const donations = await prisma.donation.updateMany({
         where: {
            campaign: {
               userId: id
            },
            seenByAuthor: false
         },
         data: {
            seenByAuthor: true
         }
      })

      if (!donations || donations.count === 0)
         return (next(createError("No notification yet!", 200)))

      return (respSuccess(res, 200, "Operation, Successed!", "Notifications Updated!", null))
   } catch (err) {
      return (next(createError("Something went wrong!", 500)))
   }
}

/**
 * userDonations, to get latest user donations
 * 
 * Description:
 *             [1] --> get user id after verify token
 *             [2] --> check if user donate any time or no, then response
 */

const userDonations = async (req, res, next) => {
   const {id} = req

   try {
      const donations = await prisma.donation.findMany({
         where: {
            userId: id
         },
         select: {
            campaign: {
               select: {
                  id: true,
                  name: true
               }
            },
            amout: true,
            createdAt: true,
            seenByAuthor: true
         }
      })

      const result = donations.map((donation) => {
         return ({
            amount: donation.amout, createdAt: donation.createdAt, seenByAuthor: donation.seenByAuthor,
            ...donation.campaign
         })
      })

      return (respSuccess(res, 200, "Operation, Successed!", 
         donations.length < 1 ? "You Did't donate any Campaign!": "Latest Donations Found!"
      , result))
   } catch (err) {
      return (next(createError("Something went wrong", 500)))
   }
}

export {
   donate,
   viewDonations,
   DonationsSeenByAuhor,
   updateSeenByAuthor,
   userDonations
}
