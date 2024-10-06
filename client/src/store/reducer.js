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
   if (action.type === "SET_PROFILE")
      return ({
         ...state, userInf: action.payload, active: true
      })
   if (action.type === "LOGOUT")
      return ({
         ...state, userInf: null, token: null, active: false
      })

   return (state)
}

const AppReducer = combineReducers({
   user: userStateReducer
})

export default AppReducer