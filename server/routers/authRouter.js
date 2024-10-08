import express from 'express'
import {
   logIn,
   logOut,
   register,
   resetPass,
   sendGenCode,
   verifyTokenController
} from '../controllers/authController.js'

const Auth = express.Router()


Auth.route('/register').post(register)
Auth.route('/login')
                     .post(logIn)
                     .get(verifyTokenController)

Auth.route("/gencode").post(sendGenCode)
Auth.route("/passreset").put(resetPass)

Auth.route("/logout").post(logOut)

export default Auth
