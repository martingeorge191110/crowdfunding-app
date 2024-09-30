import express from 'express'
import verifyToken from '../middlewares/verifyToken.js'
import { deleteAccount, deleteInfo, retrieveProfile, updateProfile, userSearch } from '../controllers/userController.js'


const User = express.Router()

User.use(verifyToken)

User.route("/profile")
                     .get(retrieveProfile)
                     .put(updateProfile)
                     .post(deleteAccount)
                     .delete(deleteInfo)

User.route("/search").get(userSearch)

export default User
