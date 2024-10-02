import { combineReducers } from "redux"
import { getCookie } from "../utilis/authUtilies"


const userState = {
   token: getCookie("token") || null,
   userInf: null,
   active: false
}


const userStateReducer = (state = userState, action) => {
   if (action.type === "LOGIN")
      return ({
         token: action.payload.token, active: action.payload.active,
         userInf: action.payload.userInf
      })

   return (state)
}

const AppReducer = combineReducers({
   user: userStateReducer
})

export default AppReducer