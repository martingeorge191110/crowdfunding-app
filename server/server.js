import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import Auth from './routers/authRouter.js'
import { ErrorHandle } from './middlewares/errorHandling.js'
import cookieParser from 'cookie-parser'
import Campaign from './routers/campaignRouter.js'
import User from './routers/userRouter.js'
import Dontation from './routers/donationRouter.js'
import morgan from 'morgan'

dotenv.config()

const environment = process.env
const server = express()

server.use(morgan("tiny"))
server.use(cookieParser())
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
server.use(express.json())
server.use(express.urlencoded({
   'extended': true
}))

/* Authintication Router */
server.use("/api/auth", Auth)

/* Campaign Router */
server.use("/api/campaigns", Campaign)

/* User Router */
server.use("/api/users", User)

/* Donation Router */
server.use("/api/donation", Dontation)

server.use("*", ErrorHandle)

server.listen(environment.PORT || 7000, () => {
   console.log("Server listening to Port", environment.PORT || 7000)
})
