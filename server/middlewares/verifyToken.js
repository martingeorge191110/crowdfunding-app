import jwt from 'jsonwebtoken'
import { createError } from '../Utilis/createError.js'
import { ErrorHandle } from './errorHandling.js'

/**
 * Middleware Function to Check Token send by user
 */

const verifyToken = (req, res, next) => {
   const {authorization} =  req.headers

   if (!authorization) {
      const newErr = createError("Authorization Must be included in Header", 404)
      return (ErrorHandle(newErr, req, res, next));
   }

   const token = authorization.split(' ')[1]
   if (!token) {
      const newErr = createError("Token is not found in Header", 404)
      return (ErrorHandle(newErr, req, res, next));
   }

   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
         const newErr = createError("Token is not Valid!", 403)
         return (ErrorHandle(newErr, req, res, next));
      }

      req.id = payload.id
      next()
   })
}

export default verifyToken;
