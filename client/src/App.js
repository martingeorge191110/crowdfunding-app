import { BrowserRouter,Route, Switch, useLocation } from "react-router-dom/cjs/react-router-dom";
import NavBar from "./components/navBar";
import LogIn from "./pages/logIn";
import Register from "./pages/register";
import ResetPassword from "./pages/resetPass";
import { useSelector } from "react-redux";
import { useEffect } from "react";



function App() {

  const token = useSelector(
    state => state.user.token
  )
const user = useSelector(
  state => state.user
)
  useEffect(() => {

  }, [token])
  return (
    <div className="App min-h-screen">
      <BrowserRouter>
      {
        token ? <NavBar/> : ""
      }
        <Switch>
          <Route exact path={"/"} component={token ? "" : LogIn} />
          <Route exact path="/register" component={token ? "" : Register} />
          <Route exact path="/reset-password" component={token ? "" : ResetPassword} />
          <Route exact component={""} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
