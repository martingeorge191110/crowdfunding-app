import React, { useRef, useState } from "react";
import NavBar from "../components/navBar";
import { useSelector } from "react-redux";
import { searchCampaignApi } from "../services/campaigns";
import Loading from "../components/loading";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ToggleNav from "../components/toggleNav";


const SearchCampaigns = () => {

   const history = useHistory()

   const token = useSelector(
      state => state.user.token
   )

   const navBar = useRef(null)

   const [campName, setCampName] = useState("")

   const [openCat, setOpenCat] = useState(false)
   const [category, setCategory] = useState(null)
   const getCatValue = (value) => {
      setCategory(value)
      setOpenCat(!openCat)
   }

   const [openStat, setOpenStat] = useState(false)
   const [status, setStatus] = useState(null)
   const getStatValue = (value) => {
      setStatus(value)
      setOpenStat(!openStat)
   }

   const [loading, setLoading] = useState(false)

   const [respMessage, setRespMessage] = useState(null)
   const [result, setResult] = useState([])

   const searchHandling = async (e) => {
      e.preventDefault()
      setLoading(true)

      let query = ""
      if (campName && campName !== "")
         query += `name=${campName}`
      if (status) {
         if (query.length > 0)
            query += '&'

         query += `status=${status}`
      }
      if (category) {
         if (query.length > 0)
            query += '&'

         query += `category=${category}`
      }
      try {
         const response = await searchCampaignApi(token, query)

         setLoading(false)
         if (response.data.length < 1)
            setRespMessage("No Campaigns with this Requirments")
         setResult(response.data)
      } catch (err) {
         setLoading(false)
         throw new Error(err)
      }
   }

   const handleDonations = (campaignInfo) => {
      history.push({
         pathname: "/donate_payment",
         state: campaignInfo
      })
   }

   const navToggleFunc = () => {
      navBar.current.classList.toggle("left-0")
   }

   return (
      <>
      {/* <NavBar/> */}
      <NavBar refrenece={navBar}/>

      <div className="min-h-screen lg:ml-52 bg-gray-100 p-8">
      <div className="container mx-auto">
            <div className="lg:block lg:mb-6 flex flex-row justify-between items-center">
               <ToggleNav clickFunc={navToggleFunc}/>
               <h1 className="text-4xl mr-20 lg:mr-0 font-bold text-center text-indigo-400  md:mr-60 sm:mr-32">Campaigns</h1>
            </div>
        {/* Search Section */}
         <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold text-indigo-600 mb-6">Search Campaigns</h2>
            <form className="space-y-4" onSubmit={searchHandling}>
               <div>
                  <label className="block text-gray-700">Campaign Name</label>
                  <input onChange={(e) => setCampName(e.currentTarget.value)}
                  value={campName}
                  type="text" 
                  placeholder="Enter campaign name" className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform duration-300" />
               </div>
               <div className="flex justify-between w-full space-x-4">
                  <div className="w-6/12">
                     <label className="block text-gray-700">Category</label>
                     <div className="flex w-full place-items-center">
                        <div className="relative w-full mt-2" >
                           <div onClick={() => setOpenCat(!openCat)} className="cursor-pointer flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300">
                              <span  className="text-zinc-500">{category ? category : "Select Category"}</span>
                              <i className={`bx bx-chevron-down text-2xl`}></i>
                           </div>

                           {openCat && <ul className="z-50 w-full absolute mt-1 rounded bg-gray-50 ring-1 ring-gray-300">
                              <li onClick={(e) => getCatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">EDUCATION</li>
                              <li onClick={(e) => getCatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">HEALTH</li>
                              <li onClick={(e) => getCatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">ENVIRONMENT</li>
                              <li onClick={(e) => getCatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">TECHNOLOGY</li>
                              <li onClick={(e) => getCatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">ARTS</li>
                           </ul>}
                        </div>
                     </div>
                  </div>
                  <div className="w-6/12">
                     <label className="block text-gray-700">Status</label>
                     <div className="flex w-full place-items-center">
                        <div className="relative w-[30rem] mt-2" >
                           <div onClick={() => setOpenStat(!openStat)} className="cursor-pointer flex w-full items-center justify-between rounded bg-white p-2 ring-1 ring-gray-300">
                              <span  className="text-zinc-500">{status ? status : "Select Status"}</span>
                              <i className={`bx bx-chevron-down text-2xl`}></i>
                           </div>

                           {openStat && <ul className="z-50 absolute mt-1 w-full rounded bg-gray-50 ring-1 ring-gray-300">
                              <li onClick={(e) => getStatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">ACTIVE</li>
                              <li onClick={(e) => getStatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">PAUSED</li>
                              <li onClick={(e) => getStatValue(e.currentTarget.textContent)} className="cursor-pointer select-none p-2 hover:bg-gray-200">ENDED</li>
                              </ul>}
                        </div>
                     </div>
                  </div>
               </div>
               <button type="submit" 
                  className={`w-full py-2 flex justify-center items-center text-white ${
                     loading ? "bg-indigo-700 pointer-events-none" : "bg-indigo-600"
                     } rounded-md transition duration-300 ease-in-out hover:bg-indigo-700`}>
                  {loading ? (
               <>
                  <Loading/>
                  Loading...
               </>
            ) : (
               "Search"
            )}
               </button>
            </form>
         </div>

        {/* Results Section */}
         <div className={`space-y-6 ${result.length > 0 ? "" : 'flex items-center flex-col justify-between'}`}>
         {
            result.length > 0 ?
               result.map((campaign) => {
                  return (
                     <div key={campaign.id} className="bg-white p-6 rounded-lg shadow-md transform transition-transform duration-500 hover:scale-95">
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{campaign.name}</h3>
                        <p className="text-gray-600 mb-4">{campaign.description}</p>
                        <div className="flex flex-wrap justify-between items-center mb-4">
                           <div className="text-sm text-gray-500">
                              <p>Goal: ${campaign.goal}</p>
                              <p>Current Amount: ${campaign.currentAmount}</p>
                              <p>Status: <span className="text-indigo-600">{campaign.status}</span></p>
                              <p>Category: {campaign.category}</p>
                              <p>Author: {campaign.author.f_name + ' ' + campaign.author.l_name}</p>
                              <p>Start Date: {campaign.startDate}</p>
                              <p>End Date: {campaign.endDate}</p>
                           </div>
                           {
                              campaign.status === "ACTIVE" && <button onClick={() => handleDonations(campaign)} className="mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors duration-300">Donate</button>
                           }
                           </div>
                     </div>
                  )
               }) : <span className="text-red-600 mt-4 w-full text-center">{respMessage}</span>
         }
          {/* Each Campaign Item */}

          {/* More campaigns can be added similarly */}
         </div>

      </div>
   </div>
      </>
   )
}

export default SearchCampaigns;
