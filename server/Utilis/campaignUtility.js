
/**
 * Function Utuility to response succefuly
 */

const resSuccCamp = (res, statusCode, statusMess, message, jsonData) => {
   return (res.status(statusCode).json({
      success: true,
      status: statusMess,
      message: message,
      data: jsonData
   }))
}


export {resSuccCamp}
