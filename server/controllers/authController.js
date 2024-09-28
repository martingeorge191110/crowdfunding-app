import { PrismaClient } from "@prisma/client";
import { loginValid, registerValid } from "../Utilis/validators/authValidator.js";
import { createError } from "../Utilis/createError.js";
import bcrypt, { hashSync } from "bcrypt";
import { creatToken, respSuccess, setCookieUtility } from "../Utilis/authUtility.js";

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
      console.log(findUser)
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
      console.log(err)
      const newError = createError("Something went wrong during Login Process!", 500)
      return (next(newError))
   }
}

export {register, logIn}
