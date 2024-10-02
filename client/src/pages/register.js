import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Input from "../components/input.js";
import { registerApi } from "../services/auth.js";
import { useDispatch } from "react-redux";
import { signInAction } from "../store/action.js";
import { getCookie } from "../utilis/authUtilies.js";

const Register = () => {

  const dispatch = useDispatch()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [gender, setGender] = useState("")
  const [response, setRepsonse] = useState(null)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = new FormData(e.target)

    const body = {
      firstName: form.get("firstName"),
      lastName: form.get("lastName"),
      email: form.get("email"),
      password: form.get("password"),
      gender: form.get("gender")
    }
    try {
      const response = await registerApi(body)

      setLoading(false)
      setRepsonse(response)
      console.log(response)
      if (response.success)
        dispatch(signInAction(getCookie("token"), response.data, true))

    } catch (err) {
      setLoading(false)
      throw new Error(err)
    }
  }

  return (
    <div className="min-h-screen p-10 flex items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Register
        </h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">First Name</label>
            <Input setInput={setFirstName} value={firstName} name={"firstName"} type={"text"} style={"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"}/>
          </div>
          <div>
            <label className="block text-gray-700">Last Name</label>
            <Input setInput={setLastName} value={lastName} name={"lastName"} type={"text"} style={"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"}/>
          </div>
          <div>
            <label className="block text-gray-700">Gender</label>
            <div className="flex justify-around mt-2">
              <label className="flex items-center space-x-2">
                <Input setInput={setGender}
                  type={"radio"}
                  name={"gender"}
                  style={"form-radio h-5 w-5 text-indigo-600"}
                  value={"MALE"}
                />
                <span className="text-gray-700">Male</span>
              </label>
              <label className="flex items-center space-x-2">
                <Input setInput={setGender}
                  type={"radio"}
                  name={"gender"}
                  style={"form-radio h-5 w-5 text-indigo-600"}
                  value={"FEMALE"}
                />
                <span className="text-gray-700">Female</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <Input setInput={setEmail}
              value={email}
              name={"email"}
              type={"email"}
              style={"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <Input setInput={setPassword}
              value={password}
              name={"password"}
              type={"password"}
              style={"w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"}
            />
          </div>
          <button
            type="submit"
            className={
              `w-full py-2 flex justify-center items-center text-white ${
              loading ? "bg-indigo-700 pointer-events-none" : "bg-indigo-600"
            } rounded-md transition duration-300 ease-in-out hover:bg-indigo-700`
            }
          >
            {
              loading ?
              <>
                <svg
                  fill="none"
                  className="w-6 h-6 animate-spin"
                  viewBox="0 0 32 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
                Loading...
              </> : "Register"
            }
          </button>
        </form>
        {
          response && response.success === false && <span className="text-red-600 mt-4 text-center">{response.message}</span>
        }
        <div className="mt-4 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
