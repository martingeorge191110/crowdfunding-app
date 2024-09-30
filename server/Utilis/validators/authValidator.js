import validator from "validator";


/**
 * Function Validator, Checks the first name and last name Validation
 * Return: true - success
 * otherwise - false
 */

const nameValid = (name) => {
   if (name.length < 2)
      return (false)

   for (let i = 0; i < name.length; i++)
   {
      if (name[i] === ' ')
         return (false);
   }

   return (true);
}

/**
 * Register Validator which checks whether user information is valid or not
 * Return: true - Success
 * otherwise - false
 */

const registerValid = (firstName, lastName, email, password, gender) => {
   let response = {
      success: false,
      message: "Every Thing is Valid!"
   }

   if (!nameValid(firstName)) {
      response.message = "First Name is not Valid!"
      return (response)
   } else if (!nameValid(lastName)) {
      response.message = "Second Name is not Valid!"
      return (response)
   } else if (!validator.isEmail(email)) {
      response.message = "Email Address is not Valid!"
      return (response)
   } else if (validator.isEmpty(gender)) {
      response.message = "Choose Your Gender Please!"
      return (response)
   }

   response.success = true;
   return (response);
}

/**
 * Login Validation to check validation of user infromation
 * Return: true - succes
 * otherwise - false
 */

const loginValid = (email, password) => {
   let response = {
      success: false,
      message: "Every Thing is Valid!"
   }

   if (!validator.isEmail(email)) {
      response.message = "Email Address is not Valid!"
      return (response)
   } else if (password.length === 0) {
      response.message = "Please Enter your Password!"
      return (response)
   }

   response.success = true
   return (response)
}

/**
 * Function Validator to check reset password information Validation
 */

const resetPassValid = (pass, conPass, email) => {
   let response = {
      success: false,
      message: "Every Thing is Valid!"
   }
   if (!validator.isEmail(email)) {
      response.message = "Email Address is not Valid!"
      return (response)
   } else if (pass.length === 0) {
      response.message = "Please Enter your password!"
      return (response)
   } else if (conPass !== pass) {
      response.message = "Confirm password is not equal password!"
      return (response)
   }

   response.success = true
   return (response)
}

export {
   registerValid,
   loginValid,
   resetPassValid
}
