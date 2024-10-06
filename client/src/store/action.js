
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

const logOutAction = () => {
   return ({
      type: "LOGOUT",
   });
}

export {
   signInAction,
   setProfileAction,
   logOutAction
}
