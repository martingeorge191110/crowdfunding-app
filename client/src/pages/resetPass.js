import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom";
import Input from "../components/input";
import Loading from "../components/loading";
import { resetPassApi, sendCodeApi } from "../services/auth";

const ResetPassword = () => {

  const history = useHistory()

  const [sendCode, setSendCode] = useState(false)
  const [loading, setLoading] = useState(false)

  const [resMessage, setResMessage] = useState(null)
  const [resetResMess, setResetResMess] = useState(null)
  const [email, setEmail] = useState("")
  
  const sendGenCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    const form = new FormData(e.target)
    const email = form.get("email")
    try {
      const sendCode = await sendCodeApi(email)

      setLoading(false)
      if (sendCode.success)
        setSendCode(true)
      else
        setResMessage(sendCode.message)

      console.log(sendCode, email)
    } catch (err) {
      setLoading(false)
      throw new Error(err)
    }
  }

  const resetPass = async (e) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.target)
    const body = {
      email: email, generatedCode: form.get("code"), password: form.get("password"), confirmPass: form.get("confirmPass")
    }

    try {
      const response = await resetPassApi(body)

      setLoading(false)
      if (response.success === false)
        setResetResMess(response.message)
      else
        history.push({pathname: "/"})
    } catch (err) {
      setLoading(false)
      throw new Error(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Reset Password
        </h2>
        {
          !sendCode && <form className="flex flex-col space-y-4" onSubmit={sendGenCode}>
          <div>
            <label className="block text-gray-700">Email</label>
            <Input value={email}
            setInput={setEmail}
            name={'email'}
              type={"email"}
              style={"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 flex justify-center items-center text-white ${
              loading ? "bg-indigo-700 pointer-events-none" : "bg-indigo-600"
            } rounded-md transition duration-300 ease-in-out hover:bg-indigo-700`}
          >
            {
              loading ? <><Loading/> Loading...</> : "Send Code"
            }
          </button>
          {
            resMessage && <span className="text-red-600 mt-4 text-center">{resMessage}</span>
          }
          </form>
        }
        {
          sendCode && <form className="flex flex-col space-y-4 mt-8" onSubmit={resetPass}>
          <div>
            <label className="block text-gray-700">Verification Code</label>
            <input
              name="code"
              type="number"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPass"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 flex justify-center items-center text-white ${
              loading ? "bg-indigo-700 pointer-events-none" : "bg-indigo-600"
            } rounded-md transition duration-300 ease-in-out hover:bg-indigo-700`}
          >
            {loading ? <><Loading/> Loading...</> : "Reset Password"}
          </button>
          {
            resetResMess && <span className="text-red-600 mt-4 text-center">{resetResMess}</span>
          }
          </form>
        }
        <div className="mt-4 text-center text-gray-600">
          <a href="/login" className="text-indigo-600 hover:underline">
            Login?
          </a>
          <p className="mt-2">
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
