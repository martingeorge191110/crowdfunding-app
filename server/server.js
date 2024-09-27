import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const environment = process.env
const server = express()

server.use(cors())
server.use(express.json())
server.use(express.urlencoded({
   'extended': true
}))


server.listen(environment.PORT || 7000, () => {
   console.log("Server listening to Port", environment.PORT || 7000)
})
