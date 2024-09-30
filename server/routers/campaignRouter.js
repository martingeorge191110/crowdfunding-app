import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { createCampaign, deleteCampaign, retriveUserCampaign, searchCampaign, updateCampaign } from '../controllers/campaignController.js'

const Campaign = express.Router()

/* Token Verification Middleware */
Campaign.use(verifyToken)

/* Route which related to user Campaign infomration (his Campaigns) */
Campaign.route("/")
                  .post(createCampaign)
                  .get(retriveUserCampaign)
                  .delete(deleteCampaign)
                  .put(updateCampaign)


Campaign.route("/search/").get(searchCampaign)


export default Campaign
