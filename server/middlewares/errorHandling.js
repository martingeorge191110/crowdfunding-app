
/**
 * Class To extend errors
 */

class NewError extends Error{
   constructor (message, statusCode) {
      super(message)
      this.message = message
      this.statusCode = statusCode
      this.status = statusCode >= 400 && statusCode <= 500 ? "Failuire" : "Error"
   }
}

/**
 * Error Hanlding Middle Ware
 */

const ErrorHandle = (err, req, res, next) => {
   return (res.status(err.statusCode).json({
      success: false,
      status: err.status || null,
		message: err.message,
		error: process.env.NODE_ENV === 'production' ? null : err.errStack
   }))
}

export {ErrorHandle, NewError}
