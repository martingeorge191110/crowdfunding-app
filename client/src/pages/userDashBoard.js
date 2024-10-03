import React, { useLayoutEffect, useRef, useState } from "react";
import NavBar from "../components/navBar";
import ToggleNav from "../components/toggleNav";
import { userProfileApi } from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../components/pageLoading";
import { signInAction } from "../store/action";
import { userCampsApi } from "../services/campaigns";
import CreateCamp from "../components/createCamp";


const UserDashBoard = () => {

    const dispatch = useDispatch()

    const navBar = useRef(null)

    const token = useSelector(
      state => state.user.token
    )

    const [loading, setLoading] = useState(true)
    const [createCampToggle, setCreateCampToggle] = useState(false)

    const [userInf, setUserInf] = useState(null)
    const [userCamps, setUserCamps] = useState([])

    const navToggleFunc = () => {
      navBar.current.classList.toggle("left-0")
    }

    const dashBoardApi = async () => {
      try {
          const response = await userProfileApi(token)
          dispatch(signInAction(token, response.data, true))
          setUserInf(response.data)
          const responseTwo = await userCampsApi(token)
          setUserCamps(responseTwo.data)
          setLoading(false)
      } catch (err) {
          throw new Error(err)
      }
    }
    useLayoutEffect(() => {
      if (token)
          dashBoardApi()
    }, [token])

    const createCamp = () => {
      setCreateCampToggle(!createCampToggle)
    }
    return (
      <>
      {loading ? "" : <NavBar refrenece={navBar}/>}
      { loading ? <PageLoader /> :
        <div className="min-h-screen lg:ml-52 bg-gray-100 p-8">
          <div className="container mx-auto">
            <div className="lg:block lg:mb-6 flex flex-row-reverse justify-between items-center">
              <h1 className="text-4xl mr-10 lg:mr-0 font-bold text-center text-indigo-600  md:mr-60 sm:mr-32">User Dashboard</h1>
              <ToggleNav clickFunc={navToggleFunc}/>
            </div>

        {/* Overview Section */}
        <div className="flex flex-wrap justify-between mb-8">
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Total Donations Received</h2>
            <p className="text-2xl font-bold text-indigo-600">$12,340</p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Active Campaigns</h2>
            <p className="text-2xl font-bold text-indigo-600">3</p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Campaigns Ended</h2>
            <p className="text-2xl font-bold text-indigo-600">5</p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Pending Withdrawals</h2>
            <p className="text-2xl font-bold text-indigo-600">$560</p>
          </div>
        </div>

         {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Profile</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <div>
                <p className="text-lg font-semibold text-gray-800">Name: {userInf.f_name} {userInf.l_name}</p>
                <p className="text-sm text-gray-500">Email: {userInf.email}</p>
              </div>
              <button className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700">Edit Profile</button>
            </div>
          </div>
        </div>

        {/* Campaign Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Campaign Management</h2>
          <div className="space-y-4">
          {
            userCamps.map((camp) => {
                return <div key={camp.id} className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{camp.name}</h3>
                  <p className="text-gray-600">Goal: ${camp.goal} | current amount: ${camp.currentAmount}</p>
                  <p className="text-sm text-gray-500">{camp.status} | Start Date: {camp.startDate} | End Date: 2023-12-31</p>
                </div>
                <div className="flex space-x-2">
                  <button className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700">Edit</button>
                  <button className="text-sm text-white bg-green-600 px-4 py-2 rounded-md hover:bg-green-700">View</button>
                </div>
          </div>
            })
          }
            </div>
            {/* Create Campaign component */}
            { createCampToggle ?
            <CreateCamp close={setCreateCampToggle} token={token} campList={userCamps} setCampList={setUserCamps}/>
            : "" }
          <button onClick={createCamp} className="mt-4 w-full text-sm text-white bg-blue-600 px-6 py-3 rounded-md hover:bg-blue-700">Create New Campaign</button>
        </div>

        {/* Donations Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Donations Management</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <div>
                <p className="text-lg font-semibold text-gray-800">John Doe</p>
                <p className="text-gray-600">Campaign: Save the Earth</p>
                <p className="text-sm text-gray-500">Amount: $100 | Date: 2023-02-14 | Status: Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Payout Information Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Payout Information</h2>
          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
            <div>
              <p className="text-lg font-semibold text-gray-800">Available Balance</p>
              <p className="text-2xl font-bold text-indigo-600">$500</p>
            </div>
            <button className="text-sm text-white bg-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-700">Request Payout</button>
          </div>
        </div>

        {/* Notifications/Message Center */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Notifications/Message Center</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md shadow-sm">
              <p className="text-sm text-gray-500">You have a new donation from John Doe for the "Save the Earth" campaign.</p>
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Analytics</h2>
          <p className="text-sm text-gray-500">Donation trends and analytics will be displayed here.</p>
        </div>
      </div>
    </div>
    }
      </>
      
  )
}

export default UserDashBoard;
