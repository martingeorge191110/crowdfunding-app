import express from 'express'
import { donate, DonationsSeenByAuhor, updateSeenByAuthor, userDonations, viewDonations } from '../controllers/donationController.js'
import verifyToken from '../middlewares/verifyToken.js'

const Dontation = express.Router()

Dontation.use(verifyToken)

Dontation.route("/")
                     .post(donate)
                     .get(viewDonations)

Dontation.route("/user")
                        .get(userDonations)

Dontation.route("/notifications")
                                 .get(DonationsSeenByAuhor)
                                 .put(updateSeenByAuthor)

export default Dontation
