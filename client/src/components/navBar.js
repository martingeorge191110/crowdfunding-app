import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NavBar = ({refrenece, clickFunc}) => {

  

  return (
    <>
      <div ref={refrenece} className={`min-h-screen z-50 -left-60 lg:left-0 transition ease-in-out fixed  flex flex-row bg-gray-100`}>
        <div className="flex flex-col  w-56 bg-white rounded-r-3xl ">
          <div className="flex items-center relative justify-around h-20 shadow-md">
            <button onClick={() => refrenece.current.classList.toggle("left-0")} className="lg:hidden text-gray-700 absolute -right-5 top-7 hover:text-red-600" aria-label="Close">
              <i className="bx bx-x text-2xl"></i>
            </button>
            <h1 className="text-l text-center uppercase text-indigo-500">Campaigns Platform</h1>
          </div>
          <ul className="flex justify-around min-h-96 flex-col py-4">
            <li>
              <Link to="/" className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-indigo-500 transition-all duration-300">
                  <i className="bx bx-home"></i>
                </span>
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to='/' className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-indigo-500 transition-all duration-300">
                  <i className="bx bx-chat"></i>
                </span>
                <span className="text-sm font-medium">Chat</span>
              </Link>
            </li>
            <li>
              <Link to='/' className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-indigo-500 transition-all duration-300">
                  <i className="bx bx-user"></i>
                </span>
                <span className="text-sm font-medium">Profile</span>
              </Link>
            </li>
            <li>
              <Link to='/' className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-indigo-500 transition-all duration-300">
                  <i className="bx bx-bell"></i>
                </span>
                <span className="text-sm font-medium">Notifications</span>
                <span className="ml-auto mr-6 text-sm bg-red-100 rounded-full px-3 py-px text-red-500">
                  5
                </span>
              </Link>
            </li>
            <li>
              <Link className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-indigo-500 transition-all duration-300">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;