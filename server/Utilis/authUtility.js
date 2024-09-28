import jwt from "jsonwebtoken";


/**
 * Function Utility to create new token
 */

const creatToken = (id) => {
   const token = jwt.sign({
      id: id
   }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP
   });

   return (token);
}

/**
 * Function Utility to set new Cookie for token
 */

const setCookieUtility = (res, token) => {
   const age = 1000 * 60 * 60 * 24 * 3;

   res.cookie("token", token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         maxAge: age
   })
}

/**
 * Function Utility to response
 */

const respSuccess = (res, statusCode, statusMess, message, jsonData) => {
      return (res.status(statusCode).json({
         success: true,
         status: statusMess,
         message: message,
         data: jsonData
      }))
}

export {creatToken, setCookieUtility, respSuccess}
