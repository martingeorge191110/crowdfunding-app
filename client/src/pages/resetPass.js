import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

const ResetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform duration-500 ease-in-out hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
          Reset Password
        </h2>
        <form className="flex flex-col space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md transition duration-300 ease-in-out hover:bg-indigo-700"
          >
            Send Code
          </button>
        </form>
        <form className="flex flex-col space-y-4 mt-8">
          <div>
            <label className="block text-gray-700">Verification Code</label>
            <input
              type="text"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <div>
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-indigo-600 rounded-md transition duration-300 ease-in-out hover:bg-indigo-700"
          >
            Reset Password
          </button>
        </form>
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
