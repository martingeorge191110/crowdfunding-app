import bcrypt from 'bcrypt';
import prisma from '../prisma/prisma.js';
import { respSuccess } from '../Utilis/authUtility.js';
import { createError } from '../Utilis/createError.js';



/**
 * retrieveProfile controller for retrieving user profile data
 * 
 * Description:
 *             [1] --> get user id after verifying the user token
 *             [2] --> Check if user exist or not and response with information
 */

const retrieveProfile = async (req, res, next) => {
   const {id} = req

   try {
      const user = await prisma.user.findUnique({
         where: {id},
      })

      if (!user)
         return (next(createError("User not  Found!", 404)))

      return (respSuccess(res, 200, "Operation, Seccessed!", "User infromation found Successfuly!", user))
   } catch (err) {
      return (next(createError("Something went wrong while retrieving user information", 500)))
   }
}

/**
 * updateProfile Controller
 * 
 * Description:
 *             [1] --> get user id and new updated information after verifying user token
 *             [2] --> Check user exist and update data, then response
 */

const updateProfile = async (req, res, next) => {
   const {id} = req
   const body = req.body

   try {
      const user = await prisma.user.update({
         where: {id},
         data: {...body}
      })

      if (!user)
         return (next(createError("User not found!", 404)))

      return (respSuccess(res, 200, "Operation, Successfuly", "User information updated Successfuly", user))
   } catch (err) {
      return (next(createError("Something went wrong while Updating user information", 500)))
   }
}

/**
 * deleteAccount Controller
 * 
 * Description:
 *             [1] --> get user id and password after verifying
 *             [2] --> Comparing user password using bcrypt compare method
 *             [3] --> Delete account if the password is correct, then Response
 */

const deleteAccount = async (req, res, next) => {
   const {id} = req
   const {password} = req.body

   try {
      const user = await prisma.user.findUnique({
         where: {id}
      })

      if (!user)
         return (next(createError("User is not found!", 404)))

      if (!bcrypt.compareSync(password, user.password))
         return (next(createError("Incorrect Password!", 409)))

      await prisma.user.delete({
         where: {id}
      })

      return (respSuccess(res, 200, "Operation, Successfuly", "Account Deleted Successfuly", null))
   } catch (err) {
      return (next(createError("Something went wrong while Deleteing user Account", 500)))
   }
}

/**
 * deleteInfo Controller
 * 
 * Description:
 *             [1] --> get userid and which section to delete after verifyng user token
 *             [2] --> response
 */

const deleteInfo = async (req, res, next) => {
   const {id} = req
   const query = req.query

   try {
      await prisma.user.update({
         where: {id},
         data: {
            [`${query.delete}`]: null
         }
      })

      return (respSuccess(res, 200, "Operation, Successed", `${query.delete} deleted, Successfuly`, null))
   } catch (err) {
      return (next(createError(`Something Went wrong while deleting ${query.delete}`)))
   }
}

/**
 * userSearch Controller
 * 
 * Description:
 *             [1] -->
 */

const userSearch = async (req, res, next) => {
   const {userId} = req.query

   try {
      const user = await prisma.user.findUnique({
         where: {id: userId},
         select: {
            id: true,
            f_name: true,
            l_name: true,
            avatar: true,
            bio: true,
            gender: true,
            createdAt: true
         }
      })

      if (!user)
         return (next(createError("User is not Found!", 404)))

      return (respSuccess(res, 200, "Operation, Successed", "User Found, Successfuly", user))
   } catch (err) {
      return (next(createError("Something went wrong while Deleteing user Account", 500)))
   }
}

export {
   retrieveProfile,
   updateProfile,
   deleteAccount,
   deleteInfo, 
   userSearch
}
