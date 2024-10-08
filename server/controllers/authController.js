import { PrismaClient } from "@prisma/client";
import { loginValid, registerValid, resetPassValid } from "../Utilis/validators/authValidator.js";
import { createError } from "../Utilis/createError.js";
import bcrypt, { hashSync } from "bcrypt";
import { creatToken, respSuccess, sendMail, setCookieUtility } from "../Utilis/authUtility.js";
import validator from "validator";
import jwt from 'jsonwebtoken'


const prisma = new PrismaClient()


/**
 * Register controller, controlling Registering Process
 *
 * Description:
 *          [1] --> get user infoprmation and check inf validation
 *          [2] --> check at first existing of user information to avoid conflict ind data base
 *          [3] --> creating new user in data base using hashed password and creating token
 *          [4] response with message and created data
 */
const register = async (req, res, next) => {
   const {firstName, lastName, email, password, gender} = req.body

   const infValidation = registerValid(firstName, lastName, email, password, gender)
   if (infValidation.success === false)
      return (next(createError(infValidation.message, 400)))

   try {
      const findUser = await prisma.user.findUnique({
         where: { email }
      })

      if (findUser)
         return (next(createError("Email Address Already Exists!", 409)))

      const hashedPass = hashSync(password, 10)

      const newUser = await prisma.user.create({
         data: {
            f_name: firstName,
            l_name: lastName,
            email: email,
            password: hashedPass,
            gender: gender
         }
      })

      const token = creatToken(newUser.id)

      const respData = {
         token: token,
         ...newUser
      }

      setCookieUtility(res, token)

      return (respSuccess(res, 201, "Operation Successfuly!", "Registering, Successfuly", respData))

   } catch (err) {
      const newError = createError("Something went wrong during creating new user!", 500)
      return (next(newError))
   }
}

/**
 * LogIn Controller, Controlling login process
 *
 * Description:
 *             [1] --> get user infromation and check for validation
 *             [2] --> Check whether the user email not exist
 *             [3] --> if user email exist compare hashed password with password user write
 *             [4] --> in case of process successed, create token and set new cookies, final step to resposne
 */

const logIn = async (req, res, next) => {
   const {email, password} = req.body

   const infValidation = loginValid(email, password)
   if (infValidation.success === false)
      return (next(createError(infValidation.message, 400)))

   try {
      const user = await prisma.user.findUnique({
         where: { email }
      })

      if (!user)
         return (next(createError("Email Address is not exist, Please Sign Up!", 404)))

      const cmpPass = bcrypt.compareSync(password, user.password)
      if (!cmpPass)
         return (next(createError("Wrong Password, try again or press Forget Password!", 409)))

      const token = creatToken(user.id)

      setCookieUtility(res, token)

      const jsonData = {
         token: token,
         ...user
      }

      return (respSuccess(res, 200, "Operation Successfuly!", "Login, Successfuly", jsonData))
   } catch (err) {
      const newError = createError("Something went wrong during Login Process!", 500)
      return (next(newError))
   }
}

/**
 * Send Gen Code Controller, for reseting password process
 *
 * Description:
 *             [1] --> get user email and check validation
 *             [2] --> Check whether user exist or not
 *             [3] --> Send generated code within mail and check mail sent or not
 */
let genCodeGlobal = {};
const sendGenCode = async (req, res, next) => {
   const {email} = req.body
   if (!validator.isEmail(email))
      return (next(createError("Email Address is not Valid!", 400)))

   try {
      const user = await prisma.user.findUnique({
         where: {email}
      })

      if (!user)
         return (next(createError("Email Address is not Exist", 404)))

      const genCode = Number(String(Math.random()).slice(3, 9))
      genCodeGlobal[email] = genCode

      const senMailVar = await sendMail(user.email, genCode)

      if (!senMailVar)
         return (next(createError("Cannot sending generated code within mail", 409)))

      return (respSuccess(res, 200, "Operation, Seccessed", "Mail sent with genCode, Succesfuly", genCode))
   } catch (err) {
      const newErr = createError("Somthing went wrong during sending generated code within mail", 500)
      return (next(newErr))
   }
}

/**
 * Reset Password Controller, final step for setting new Password
 *
 * Description:
 *             [1] --> get user information, Check Code generated to user Validation and inf validation
 *             [2] --> hashed new password, updating user password and response
 * 
 * IMP NOTE: this controller should be used after sending gen code and
 *             Checking whether email exist or not (after sendGenCode Controller)
 */

const resetPass = async (req, res, next) => {
   const {password, confirmPass, email, generatedCode} = req.body

   /* Check Gen Code Validation */
   if (!genCodeGlobal[email]) {
      return (next(createError("No generated code found for this email.", 404)));
   }
   if (genCodeGlobal[email] !== Number(generatedCode)) {
      return (next(createError("The entered code is incorrect.", 400)));
   }

   /* Continue the process */
   const infValidation = resetPassValid(password, confirmPass, email)
   if (infValidation.success === false)
      return (next(createError(infValidation.message, 400)))

   try {
      const hashedPass = hashSync(password, 10);

      await prisma.user.update({
         where: {email},
         data: {
            password: hashedPass
         }
      })

      delete genCodeGlobal[email]
      return (respSuccess(res, 200, "Operation, Succesfuly", "Password updated successfully!", null))
   } catch (err) {
      return (next(createError("Somthing went wrong during Password Updating process", 500)))
   }
}

const verifyTokenController = async (req, res, next) => {
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

      return respSuccess(res, 200, "Operation, Seccessed!", "Token is Valid, Welcome again", null)
   })
}

/**
 * logOut Controller - Log out process
 * 
 * Description:
 *             [1] --> clear cookies and response
 */

const logOut = (req, res) => {
   res.clearCookie('token')
   return (respSuccess(res, 200, "Operation, Successed!", "Successfully logged out", null))
}

export {
   register,
   logIn,
   sendGenCode,
   resetPass,
   verifyTokenController,
   logOut
}
