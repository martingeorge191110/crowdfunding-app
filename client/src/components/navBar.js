import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { logOutApi } from "../services/auth";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { logOutAction } from "../store/action";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const NavBar = ({refrenece}) => {

  const history = useHistory()

  const token = useSelector(
    state => state.user.token
  )

  const dispatch = useDispatch()

  const logOutHandling = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out from the system.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log out!'
  }).then((result) => {
      if (result.isConfirmed) {
        logOutApi(token)
        
          Swal.fire(
              'Logged out!',
              'You have been successfully logged out.',
              'success'
          ).then(() => {
              dispatch(logOutAction())
              history.push({
                pathname: '/'
              })
          });
      }
  });
    
  }

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
              <Link to='/search_Camps' className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-indigo-500 transition-all duration-300">
                  <i className="bx bx-search "></i>
                </span>
                <span className="text-sm font-medium">Search Campaigns</span>
              </Link>
            </li>
            <li>
              <Link to='/Profile' className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
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
                <span className="text-sm font-medium">Chat <span className="text-[12px] ml-2">(Upcomming Feature)</span></span>
              </Link>
            </li>
            <li>
              <button onClick={logOutHandling} className="flex flex-row items-center h-12 transform transition-transform ease-in-out duration-300 text-gray-500 hover:text-indigo-500 hover:scale-105">
                <span className="inline-flex items-center justify-center h-12 w-12 text-lg text-gray-400 hover:text-indigo-500 transition-all duration-300">
                  <i className="bx bx-log-out"></i>
                </span>
                <span className="text-sm font-medium">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;