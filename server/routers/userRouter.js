import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { deleteAccount, retrieveProfile, updateProfile } from '../controllers/userController.js'


const User = express.Router()

User.use(verifyToken)

User.route("/profile")
                     .get(retrieveProfile)
                     .put(updateProfile)
                     .post(deleteAccount)


export default User
