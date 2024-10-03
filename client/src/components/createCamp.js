import React, { useState } from "react";
import { createCamp } from "../services/campaigns";
import Loading from "./loading";


const CreateCamp = ({close, token, setCampList, campList}) => {


   const [loading, setLoading] = useState(false)

   const [message, setMessage] = useState("")

   const submitHandler = async (e) => {
      e.preventDefault()
      setLoading(true)

      const form = new FormData(e.target)

      const body ={
         name: form.get("name"),
         description: form.get("description"), goal: form.get("goal"), status: form.get("status"),
         category: form.get("category"), startDate: form.get("startDate").length > 0 ? new Date(`${form.get("startDate")}T00:00:00.000Z`): null,
         endDate: form.get("endDate") ? new Date(`${form.get("endDate")}T00:00:00.000Z`) : null, paypalEmail: form.get("email")
      }
      console.log(body)

      try {
         const response = await createCamp(token, body)

         console.log(response)
         if (response.success === false) {
            setMessage(response.message)
            setLoading(false)
            return;
         }
         setCampList([...campList, response.data])
         close(false)
      } catch (err) {
         setLoading(false)
         throw new Error(err)
      }
   }

   return (
      <>
<div className="bg-white rounded-lg shadow-lg p-8 mb-8 transition-all duration-500 ease-in-out transform scale-100">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-bold text-gray-700">Create New Campaign</h2>
    <button onClick={() => close(false)} className="text-gray-700 hover:text-red-600" aria-label="Close">
      <i className="bx bx-x text-2xl"></i>
    </button>
  </div>
  <form className="space-y-4" onSubmit={submitHandler}>
    <div>
      <label className="block text-gray-700">Campaign Name</label>
      <input name="name" type="text" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
    </div>
    <div>
      <label className="block text-gray-700">Description</label>
      <textarea name="description" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" rows="4"></textarea>
    </div>
    <div>
      <label className="block text-gray-700">Goal</label>
      <input name="goal" type="number" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
    </div>
    <div>
      <label className="block text-gray-700">Status</label>
      <div className="flex space-x-4 mt-1">
        <label className="flex items-center space-x-2">
          <input type="radio" name="status" value="ACTIVE" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Active</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="status" value="PAUSED" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Paused</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="status" value="ENDED" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Ended</span>
        </label>
      </div>
    </div>
    <div>
      <label className="block text-gray-700">Category</label>
      <div className="flex space-x-4 mt-1">
        <label className="flex items-center space-x-2">
          <input type="radio" name="category" value="EDUCATION" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Education</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="category" value="HEALTH" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Health</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="category" value="ENVIRONMENT" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Environment</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="category" value="TECHNOLOGY" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Technology</span>
        </label>
        <label className="flex items-center space-x-2">
          <input type="radio" name="category" value="ARTS" className="form-radio h-4 w-4 text-indigo-600" />
          <span className="text-gray-700">Arts</span>
        </label>
      </div>
    </div>
    <div>
      <label className="block text-gray-700">Start Date</label>
      <input name="startDate" type="date" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
    </div>
    <div>
      <label className="block text-gray-700">End Date</label>
      <input name="endDate" type="date" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
    </div>
    <div>
      <label className="block text-gray-700">Your ReceivING Money Email</label>
      <input name="email" type="email" className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600" />
    </div>
      {
         message && <span className="text-red-600 mt-4 text-center">{message}</span>
      }
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
              "Submit"
            )}
               </button>
   </form>
</div>

      </>
   )
}

export default CreateCamp;
