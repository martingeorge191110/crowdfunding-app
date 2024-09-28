import { NewError } from "../middlewares/errorHandling.js"

/**
 * Function Utility to create error
 */

const createError = (message, statusCode) => {
   return (new NewError(message, statusCode))
}

export {createError}
