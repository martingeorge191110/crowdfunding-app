import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer'


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

/**
 * Function utility to send mail for setting user password
 */

const sendMail = async (userEmail, genCode) => {
   const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         user: process.env.GMAIL_USER,
         pass: process.env.GMAIL_PASS
      }
   })

   const mail = {
      from: process.env.GMAIL_USER,
		to: userEmail,
		subject: 'Password Reset Request',
		html: `
			<h1>Password Reset</h1>
			<p>Generated Code</p>
			<h2>${genCode}</h2>
		`,
   }

   try {
      await transporter.sendMail(mail)

      return (true)
   } catch (err) {
      console.log(err)
      return (false)
   }
}


export {
   creatToken,
   sendMail,
   setCookieUtility,
   respSuccess
}
