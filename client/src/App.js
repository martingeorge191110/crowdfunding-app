import { BrowserRouter,Route, Switch } from "react-router-dom/cjs/react-router-dom";
import LogIn from "./pages/logIn";
import Register from "./pages/register";
import ResetPassword from "./pages/resetPass";
import {  useSelector } from "react-redux";
import { useEffect, useState } from "react";
import UserDashBoard from "./pages/userDashBoard";
import { verifyToken } from "./services/auth";
import PageLoader from "./components/pageLoading";
import 'boxicons/css/boxicons.min.css';



function App() {

  const token = useSelector(
    state => state.user.token
  )

  const [tokenValid, setTokenValid] = useState(false)
  const [loading, setLoading] = useState(true)


  const appFetchApis = async () => {
    try {
      const response = await verifyToken(token)
        
      if (response.success){
        setTokenValid(true)
      } else {
        setTokenValid(false)
      }

      setLoading(false)
    } catch (err) {
      throw new Error(err)
    }
  }
  useEffect(() => {
    if (token)
      appFetchApis()
    else
      setLoading(false)
  }, [])

  useEffect(() => {
    if (token)
      setTokenValid(true)
    else
      setLoading(false)
  }, [token])

  return (
      <div className="App min-h-screen">
      { loading ? <PageLoader /> :
      <BrowserRouter>
        <Switch>
          <Route exact path={"/"} component={tokenValid ? UserDashBoard : LogIn} />
          <Route exact path="/register" component={tokenValid ? "" : Register} />
          <Route exact path="/reset-password" component={tokenValid ? "" : ResetPassword} />
          <Route exact component={tokenValid ? UserDashBoard : LogIn} />
        </Switch>
      </BrowserRouter>
      }
    </div>
    
  );
}

export default App;
