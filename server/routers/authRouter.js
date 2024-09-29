import express from 'express'
import { logIn, register, resetPass, sendGenCode } from '../controllers/authController.js'

const Auth = express.Router()


Auth.route('/register').post(register)
Auth.route('/login').post(logIn)
Auth.route("/gencode").post(sendGenCode)
Auth.route("/passreset").put(resetPass)


export default Auth
