import React, { useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { userProfileApi } from '../services/user';
import PageLoader from '../components/pageLoading';
import { retrieveDonsApi } from '../services/donations';
import NavBar from '../components/navBar';
import ToggleNav from '../components/toggleNav';




const UserCampagin = () => {

   const campaign = useHistory().location.state

   const token = useSelector(
      state => state.user.token
   )

   const [user, setUser] = useState(null)
   const [donations, setDonations] = useState(null)

   const fetchingProfile = async () => {
      try {
         const resposne = await userProfileApi(token)
         const responseTwo = await retrieveDonsApi(token, campaign.id)
        //  console.log(responseTwo, resposne)

         if (resposne.success)
            setUser(resposne.data)

         if (responseTwo.success)
            setDonations(responseTwo.data)
         else if (resposne.success && !responseTwo.success)
            setDonations(responseTwo.message)

      } catch (err) {
         throw new Error(err)
      }
   }

   useLayoutEffect(() => {
      if (token)
         fetchingProfile()
   }, [])

    const navBar = useRef(null)

    const navToggleFunc = () => {
      navBar.current.classList.toggle("left-0")
    }

   return (
      <>
      {
         !user || !donations ? <PageLoader /> :
         <>
         <NavBar refrenece={navBar}/>
   <div className="min-h-screen  lg:ml-52 bg-gray-100 p-8">
   <ToggleNav clickFunc={navToggleFunc}/>
      <div className="container mx-auto block lg:flex justify-evenly bg-white p-8 rounded-lg shadow-lg">
         <div>
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">Campaign Details</h1>

        {/* Campaign Details */}
        <div className="space-y-4 mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Campaign Name</h2>
            <p className="text-lg text-gray-800">{campaign.name}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Description</h2>
            <p className="text-lg text-gray-800">{campaign.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Goal</h2>
            <p className="text-lg text-gray-800">${campaign.goal}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Current Amount</h2>
            <p className="text-lg text-gray-800">${campaign.currentAmount}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Status</h2>
            <p className="text-lg text-indigo-600">{campaign.status}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Category</h2>
            <p className="text-lg text-gray-800">{campaign.category}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Date Range</h2>
            <p className="text-lg text-gray-800">Start: {campaign.startDate} - End: {campaign.endDate}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Author</h2>
            <p className="text-lg text-gray-800">{user.f_name + ' ' + user.l_name} ({user.email})</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">PayPal Email</h2>
            <p className="text-lg text-gray-800">{campaign.paypalEmail}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Created At</h2>
            <p className="text-lg text-gray-800">{campaign.createdAt}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-700">Updated At</h2>
            <p className="text-lg text-gray-800">{campaign.updatedAt}</p>
          </div>
        </div>
         </div>
        {/* Donations Section */}
        <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Donations</h2>
         {
            typeof(donations) === 'object' && donations.length > 0 ?
            donations.map((donation) => {
               return (
                  <div key={donation.id} className="space-y-4">
                  <div className="bg-gray-50 mt-5 p-4 rounded-md shadow-sm">
                    <p className="text-lg font-semibold text-gray-800">Donor: {donation.f_name + ' ' + donation.l_name}</p>
                    <p className="text-gray-600">Email: {donation.email}</p>
                    <p className="text-sm text-gray-500">Amount: ${donation.amount} | Date: {donation.createdAt}</p>
                  </div>
                </div>
               )
            }) : donations
         }
        </div>
      </div>
    </div>
    </>
}
    </>
  );
};

export default UserCampagin;
