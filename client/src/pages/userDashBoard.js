import React, {useEffect, useLayoutEffect, useRef, useState } from "react";
import NavBar from "../components/navBar";
import ToggleNav from "../components/toggleNav";
import { userProfileApi } from "../services/user";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../components/pageLoading";
import { signInAction } from "../store/action";
import { updateCmapApi, userCampsApi } from "../services/campaigns";
import CreateCamp from "../components/createCamp";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import EditProfile from "../components/editProfile";
import { allUserDonsApi, donationsNotificationsApi, seeNotificationsApi } from "../services/donations";
import Swal from 'sweetalert2';


const UserDashBoard = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const navBar = useRef(null)

    const token = useSelector(
      state => state.user.token
    )

    const [loading, setLoading] = useState(true)
    const [createCampToggle, setCreateCampToggle] = useState(false)
    const [editProfToggle, setEditProfToggle] = useState(false)

    const [userInf, setUserInf] = useState(null)
    const [userCamps, setUserCamps] = useState([])
    const [userDonations, setUserDonations] = useState([])


    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(0)
    const [ended, setEnded] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    const [donationsCheck, setDonationsCheck] = useState(false)

    const [notifChecks, setNotifChecks] = useState(false)
    const [seeNotiOnce, setSeeNotiOnce] = useState(false)
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
      if (userCamps) {
        let result = 0
        let activate = 0
        let pausing = 0
        let ending = 0
        userCamps.forEach((campaign) => {
          if (campaign.status === "ACTIVE")
            activate += 1
          else if (campaign.status === "PAUSED")
            pausing += 1
          else
            ending += 1

        setActive(activate)
        setEnded(ending)
        setPaused(pausing)
        result += campaign.currentAmount
        })
        setTotalAmount(result)
      }
    }, [userCamps])

    const navToggleFunc = () => {
      navBar.current.classList.toggle("left-0")
    }

    const updateCampStatus = async (campId, status) => {

      try {
        Swal.fire({
          title: 'Are you sure?',
          text: `You Will ${status} this Campaign!`,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: `Yes, ${status} it!`,
          cancelButtonText: 'No, cancel!',
          preConfirm: async () => {
            // Change to loading state
            Swal.showLoading();
            try {
              await updateCmapApi(token, campId, status)
            } catch (err) {
              throw new Error(err)
            }
          }
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Succcessed',
              text: 'Your Campaign has been Updated.',
              icon: 'success'
            });
            for (let i = 0; i < userCamps.length; i++) {
              let allCamps = [...userCamps]
              if (allCamps[i].id === campId) {
                allCamps[i].status = status
                setUserCamps([...allCamps])
                return;
              }
            }
          }
        });
      } catch (err) {

      }
    }

    const dashBoardApi = async () => {
      try {
          const response = await userProfileApi(token)
          dispatch(signInAction(token, response.data, true))
          setUserInf(response.data)

          const responseTwo = await userCampsApi(token)
          setUserCamps(responseTwo.data)

          const responseThree = await allUserDonsApi(token)
          setUserDonations(responseThree.data)

          const responseFour = await donationsNotificationsApi(token)
          setNotifications(responseFour.data)

          if (response.success === false)
            return;
          setLoading(false)
      } catch (err) {
          return (err)
      }
    }
    useLayoutEffect(() => {
      if (token)
          dashBoardApi()
    }, [token])

    const createCamp = () => {
      setCreateCampToggle(!createCampToggle)
    }

    const seeNotifications = async () => {
      setNotifChecks(!notifChecks)

      if (seeNotiOnce)
        return (null)

      setSeeNotiOnce(true)
      try {
        const response = await seeNotificationsApi(token)
        // console.log(response)
        return (response)
      } catch (err) {
        return (null)
      }
    }

    return (
      <>
      {loading ? "" : <NavBar refrenece={navBar}/>}
      { loading ? <PageLoader /> :
        <div className="min-h-screen lg:ml-52 bg-gray-100 p-8">
          <div className="container mx-auto">
            <div className="lg:block lg:mb-6 flex flex-row justify-between items-center">
            <ToggleNav clickFunc={navToggleFunc}/>
              <h1 className="text-4xl mr-10 lg:mr-0 font-bold text-center text-indigo-400  md:mr-60 sm:mr-32">User Dashboard</h1>
            </div>

        {/* Overview Section */}
        <div className="flex flex-wrap justify-between mb-8">
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Total Donations Received</h2>
            <p className="text-2xl font-bold text-indigo-400">${totalAmount}</p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Active Campaigns</h2>
            <p className="text-2xl font-bold text-indigo-400">{active}</p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Campaigns Paused</h2>
            <p className="text-2xl font-bold text-indigo-400">{paused}</p>
          </div>
          <div className="flex-1 bg-white rounded-lg shadow-lg p-6 m-2 transform transition-transform duration-500 hover:scale-105">
            <h2 className="text-lg font-semibold text-gray-700">Campagins Ended</h2>
            <p className="text-2xl font-bold text-indigo-400">{ended}</p>
          </div>
        </div>

         {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Profile</h2>
          <div className="space-y-4">
            <div className="block lg:flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
              <div>
                <p className="text-lg font-semibold text-gray-800">Name: {userInf.f_name} {userInf.l_name}</p>
                <p className="text-sm text-gray-500">Email: {userInf.email}</p>
              </div>
              <button onClick={() => setEditProfToggle(!editProfToggle)} className="mt-4 lg:mt-0 text-sm text-white bg-indigo-400 px-4 py-2 rounded-md hover:bg-indigo-700">Edit Profile</button>
            </div>
          </div>
          {editProfToggle ? <EditProfile /> : ""}
        </div>

        {/* Campaign Management Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Campaign Management</h2>
          <div className="space-y-4">
          {
            userCamps.map((camp) => {
                return <div key={camp.id} className="block lg:flex justify-between items-center bg-gray-50 p-4 rounded-md shadow-sm">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{camp.name}</h3>
                  <p className="text-gray-600">Goal: ${camp.goal} | current amount: ${camp.currentAmount}</p>
                  <p className="text-sm text-gray-500">{camp.status} | Start Date: {camp.startDate} | End Date: 2023-12-31</p>
                </div>
                <div className="mt-4 lg:mt-0 flex space-x-2">
                  <button onClick={() => {history.push({pathname: `/user/campaign/${camp.id}`, state: camp})}}
                    className="text-sm text-white bg-green-400 px-4 py-2 rounded-md hover:bg-green-700">View</button>
                  <button onClick={() => updateCampStatus(camp.id, camp.status === 'PAUSED' ? 'ACTIVE' : 'PAUSED')} className="text-sm text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-700">{camp.status === 'PAUSED' ? 'ACTIVE' : 'PAUSED'}</button>
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
        <div onClick={() => {
            setDonationsCheck(!donationsCheck)
          }}  className="bg-white hover:bg-slate-300 cursor-pointer transition-all ease-in-out rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-700 mb-4"> Your Donations Management</h2>
            <i className={`bx bx-chevron-${donationsCheck ? 'up': 'down'} text-2xl`}></i>
          </div>
          <div className={`${donationsCheck ? 'block': 'hidden'} space-y-4`}>
              {
                userDonations.length > 0 ?
                userDonations.map((doantion, index
                ) => {
                  return (
                  <div key={index} className={` bg-gray-50 p-4 rounded-md shadow-sm`}>
                    <div className="flex justify-between items-start">
                      <p className="text-lg font-semibold text-gray-800">Campaign: {doantion.name}</p>
                      <p className="text-sm text-gray-500">Amount: ${doantion.amount} | Date: {doantion.createdAt} | Seen By Campaign Author: {doantion.seenByAuthor ? "YES" : "NO"}</p>
                    </div>
                  </div>
                  )}) : "No thing here"
              }
          </div>
        </div>


        {/* Notifications/Message Center */}
        <div onClick={seeNotifications} className="bg-white cursor-pointer hover:bg-slate-300 transition-all ease-in-out rounded-lg shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-700 mb-4">Notifications/Message Center {notifications && notifications.length > 0 && <span className="text-red-600 mt-4 ml-4 w-full text-center bg-red-300 rounded-full p-1 px-3">{notifications.length}</span>}</h2>
            <i className={`bx bx-chevron-${notifChecks ? 'up': 'down'} text-2xl`}></i>
          </div>
          <div className={`${notifChecks ? 'block' : "hidden"} space-y-4`}>
            {
              notifications && notifications.length > 0 &&
              notifications.map((notification, index) => {
                return (
                  <div key={index} className="bg-gray-50 p-4 rounded-md shadow-sm">
                    <p className="text-sm text-gray-500">You have a new donation from {notification.f_name + ' ' + notification.l_name} for the "{notification.name}" campaign, with ${notification.amount}</p>
                  </div>
                )
              })
            }
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
