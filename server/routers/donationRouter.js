import express from 'express'
import { donate, viewDonations } from '../controllers/donationController.js'
import verifyToken from '../middlewares/verifyToken.js'

const Dontation = express.Router()

Dontation.use(verifyToken)

Dontation.route("/")
                     .post(donate)
                     .get(viewDonations)

export default Dontation
