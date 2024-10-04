import React, { useRef, useState } from "react";
import Loading from "./loading";
import { useSelector } from "react-redux";




const EditProfile = () => {

   const user = useSelector(
      state => state.user.userInf
   )

   const submitBtn = useRef(null)
   const [loading, setLoading] = useState(false)
   const [btnSubmit, setBtnSubmit] = useState(false)
   const [updatedInf, setUpdatedInf] = useState("")

   const hadnleInput = (inputEle, infSection) => {
      setBtnSubmit(true)
      inputEle.classList.toggle("hidden")
      infSection.classList.toggle("hidden")
   }

   return (
      <>
         <div className="bg-white rounded-lg shadow-lg p-8 m-2 w-full  mx-auto">
            <h2 className="text-2xl text-center font-bold text-gray-700 mb-6">Edit User Information</h2>
            {
               updatedInf.length > 0 ? 
                  <p className="text-lg text-center text-gray-800 mr-2">{updatedInf}</p>
                  : 
                  <>
                     {/* First Name */}
                     <div className="flex items-center justify-around mb-4">
                        <div className="flex items-center">
                           <p className="text-lg text-gray-800 mr-2">First Name: John</p>
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                              } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit First Name">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <input type="text" placeholder="John" className="hidden w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform duration-300" />
                     </div>

                     {/* Last Name */}
                     <div className="flex items-center justify-around mb-4">
                        <div className="flex items-center">
                           <p className="text-lg text-gray-800 mr-2">Last Name: Doe</p>
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                           } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit Last Name">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <input type="text" placeholder="Doe" className="hidden w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform duration-300" />
                     </div>

                     {/* Bio */}
                     <div className="flex items-center justify-around mb-4">
                        <div className="flex items-center">
                           <p className="text-lg text-gray-800 mr-2">Bio: Creative Designer</p>
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                           } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit Bio">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <textarea placeholder="Creative Designer" className="hidden w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform duration-300" rows="3"></textarea>
                     </div>

                     {/* Profile Photo */}
                     <div className="flex items-center justify-around mb-4">
                        <div className="flex items-center">
                           <img src="" alt="Profile" className="w-16 h-16 rounded-full mr-4" />
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                           } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit Profile Photo">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <div className="hidden  items-center">
                           <label className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow-sm hover:bg-gray-300 transition duration-300">
                              <span>Upload Photo</span>
                              <input type="file" className="hidden" />
                           </label>
                        </div>
                     </div>

                     {/* Submit Button */}
                     <button ref={submitBtn} 
                        onClick={() => {
                           setLoading(true)
                           setTimeout(() => {
                              setLoading(false)
                              setUpdatedInf("Profile Information Updated Successfuly!")
                           }, 1000);
                        }}
                        className={`${btnSubmit ? 'flex' : "hidden"} w-full py-2  justify-center items-center text-white ${
                           loading ? "bg-indigo-700 pointer-events-none" : "bg-indigo-600"
                           } rounded-md transition duration-300 ease-in-out hover:bg-indigo-700`}>
                        {loading ? (
                           <> <Loading/> Loading... </>
                           ) : ( "Submit" )}
                     </button>

                  </>
            }
         </div>
      </>
   )
}

export default EditProfile;
