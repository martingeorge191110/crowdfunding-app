import React, { useEffect, useRef, useState } from "react";
import Loading from "./loading";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateUserApi } from "../services/user";
import { setProfileAction } from "../store/action";




const EditProfile = () => {

   const dispatch = useDispatch()

   const user = useSelector(
      state => state.user.userInf
   )

   const token = useSelector(
      state => state.user.token
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

   const [fName, setFName] = useState("")
   const [lName, setLName] = useState("")
   const [bio, setBio] = useState("")
   const [img, setImg] = useState(null)
   const [sendImg, setSendImg] = useState(null)

   const readFileImg = (e) => {
      const file = e.target.files[0];
      setSendImg(file)
      if (file) {
         const reader = new FileReader();
         reader.onload = (event) => {
            setImg(event.target.result)
         };
         reader.readAsDataURL(file);
      }
   }



   const updateUserInf = async () => {
      setLoading(true)
      let body = {}
      if (fName && fName !== "")
         body['f_name'] = fName
      if (lName && lName !== "")
         body['l_name'] = lName
      if (bio && bio !== "")
         body['bio'] = bio

      try {
         if (img) {
            const formData = new FormData();
            formData.append('file', img);
            formData.append('upload_preset', 'Campaigns Project');

            const storeImg = await axios.post("https://api.cloudinary.com/v1_1/daghpnbz3/image/upload", formData)
            body['avatar'] = storeImg.data.secure_url
         }

         const response = await updateUserApi(token, body)

         if (response.success) {
            dispatch(setProfileAction(response.data))
            setUpdatedInf(response.message)
         }

      } catch (err) {
         console.log(err)
      } finally {
         setLoading(false)
      }
      // setTimeout(() => {
      //    console.log(fName, lName, bio)
      //    setLoading(false)
      //    setUpdatedInf("Profile Information Updated Successfuly!")
      // }, 1000);
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
                           <p className="text-lg text-gray-800 mr-2">First Name: {user.f_name}</p>
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                              } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit First Name">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <input onChange={(e) => setFName(e.currentTarget.value)} type="text" value={fName} placeholder="John" className="hidden w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform duration-300" />
                     </div>

                     {/* Last Name */}
                     <div className="flex items-center justify-around mb-4">
                        <div className="flex items-center">
                           <p className="text-lg text-gray-800 mr-2">Last Name: {user.l_name}</p>
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                           } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit Last Name">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <input onChange={(e) => setLName(e.currentTarget.value)} type="text" value={lName} placeholder="Doe" className="hidden w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform duration-300" />
                     </div>

                     {/* Bio */}
                     <div className="flex items-center justify-around mb-4">
                        <div className="flex items-center">
                           <p className="text-lg text-gray-800 mr-2">Bio: {user.bio || "None"}</p>
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                           } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit Bio">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <textarea value={bio} onChange={(e) => setBio(e.currentTarget.value)} placeholder="Creative Designer" className="hidden w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-transform duration-300" rows="3"></textarea>
                     </div>

                     {/* Profile Photo */}
                     <div className="flex items-center justify-around mb-4">
                        <div className="flex items-center">
                           <img src={user.avatar} alt="Profile" className="w-28 rounded-full mr-4" />
                           <button onClick={
                              (e) => hadnleInput(e.currentTarget.parentElement.parentElement.children[1], e.currentTarget.parentElement)
                           } className="text-indigo-600 hover:text-indigo-800" aria-label="Edit Profile Photo">
                              <i className="bx bxs-edit text-xl"></i>
                           </button>
                        </div>
                        <div className="hidden items-center">
                           <div className="w-full h-full flex bg-black bg-opacity-60">
                              <div className="p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                                 <div className="file_upload flex flex-col items-center p-5 relative border-4 border-dotted border-gray-300 rounded-lg" style={{width: "450px"}}>
                                    <img src={img} alt="Profile" className="max-w-40 rounded-md m-4" />
                                    
                                    <div className="input_field flex flex-col w-max mx-auto text-center">
                                       <label>
                                          <input onChange={readFileImg} className="text-sm cursor-pointer w-36 hidden" type="file" />
                                          <div className="text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                                       </label>

                                       <div className="title text-indigo-500 uppercase">or drop files here</div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     {/* Submit Button */}
                     <button ref={submitBtn} 
                        onClick={updateUserInf}
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
