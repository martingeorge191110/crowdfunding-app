import React, {  useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { loginApi } from "../services/auth.js";
import Input from "../components/input.js";
import { useDispatch } from "react-redux";
import { getCookie } from "../utilis/authUtilies.js";
import { signInAction } from "../store/action.js";
import Loading from "../components/loading.js";

const Login = () => {

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const [response, setRepsonse] = useState(null)
  const [loading, setLoading] = useState(false)

  const hanldeSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await loginApi(email, password)

      setLoading(false)
      setRepsonse(response)
      if (response.success)
        dispatch(signInAction(getCookie("token"), response.data, true))

    } catch (err) {
      setLoading(false)
      return;
    }
  }

  return (
    <>
    {/* <NavBar/> */}
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Login
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          lacinia odio vitae vestibulum vestibulum.
        </p>
        <form onSubmit={hanldeSubmit} className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <Input
              name={"email"}
              type={"email"}
              style={
                "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              }
              value={email}
              setInput={setEmail}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <Input
              name={"password"}
              type={"password"}
              style={
                "w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              }
              value={password}
              setInput={setPassword}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 flex justify-center items-center text-white ${
              loading ? "bg-indigo-700 pointer-events-none" : "bg-indigo-600"
            } rounded-md transition duration-300 ease-in-out hover:bg-indigo-700`}
          >
            {loading ? (
              <>
                <Loading/>
                Loading...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>
        {
          response && response.success === false && <span className="text-red-600 mt-4 text-center">{response.message}</span>
        }
        <div className="mt-4 text-center text-gray-600">
          <Link
            to="/reset-password"
            className="text-indigo-600 hover:underline"
          >
            Forgot Password?
          </Link>
          <p className="mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
