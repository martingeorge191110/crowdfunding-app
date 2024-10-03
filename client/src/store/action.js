
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

const setProfileAction = (userInf) => {
   return ({
      type: "SET_PROFILE",
      payload: userInf
   });
}

export {
   signInAction,
   setProfileAction
}