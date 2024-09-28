import express from 'express'
import { logIn, register } from '../controllers/authController.js'

const Auth = express.Router()


Auth.route('/register').post(register)
Auth.route('/login').post(logIn)


export default Auth
