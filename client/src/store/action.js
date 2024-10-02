
/**
 * Sign in Action
 */

const signInAction = (token, userInf, active) => {
   return ({
      type: "LOGIN",
      payload: {
         token, userInf, active
      }
   });
}

export {
   signInAction
}