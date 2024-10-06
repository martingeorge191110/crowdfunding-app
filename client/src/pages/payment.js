import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import Swal from "sweetalert2";
import { userProfileApi } from "../services/user";
import { donateApi } from "../services/donations";


const Donate = () => {

    const campaign = useHistory().location.state

    const token = useSelector(
        state => state.user.token
    )

    const [amount, setAmount] = useState(null)
    const [falseMessage, setFalseMessage] = useState('')
    const handlePayment = async () => {
        try {
          // Show confirmation dialog to the user
          const result = await Swal.fire({
            title: 'Confirm Donation',
            text: `Do you want to donate $${amount}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, donate!',
            cancelButtonText: 'No, cancel',
          });
      
          // Check if the user confirmed the donation
          if (result.isConfirmed) {
            // Show loading state while processing the payment
            Swal.fire({
              title: 'Processing your payment...',
              text: 'Please wait a moment.',
              icon: 'info',
              allowOutsideClick: true,
              didOpen: () => {
                Swal.showLoading();
              },
            });

            const userResp = await userProfileApi(token)
            const donationResp = await donateApi(token, campaign.id, amount)
            const resSuccess = donationResp.success

            if (resSuccess) {
                await Swal.fire({
                title: 'Payment Successful!',
                text: `Thank you, ${userResp.data.f_name + ' ' + userResp.data.l_name}, for your donation of $${amount}.`,
                icon: 'success',
            })} else if (resSuccess === false) {
                setFalseMessage(donationResp.message)
                Swal.fire({
                    title: 'Payment Error',
                    text: falseMessage || "Something went wrong while processing your payment.",
                    icon: 'error',
                });
            }
          } else {
            // If the user canceled the donation
            Swal.fire({
              title: 'Donation Canceled',
              text: 'Your donation has been canceled.',
              icon: 'info',
            });
          }
        } catch (error) {
          // Handle any errors that may occur
          Swal.fire({
            title: 'Payment Error',
            text: falseMessage || "Something went wrong while processing your payment.",
            icon: 'error',
          });
        }
      };
      

    return (
        <>
            <section className="antialiased bg-gray-100 text-gray-600 min-h-screen flex items-center justify-center p-4">
                <div className="h-full">
                    {/* <!-- Pay component --> */}
                    <div>

                        <div className="relative px-4 sm:px-6 lg:px-8  max-w-lg mx-auto" x-data="{ card: true }">
                            <div className="bg-white px-8 p-6 rounded-md rounded-b shadow-lg">

                                <div className="text-center mb-6">
                                    <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">{campaign.name}</h1>
                                        <div className="text-sm">
                                            {campaign.description}
                                        </div>
                                </div>
                                <div className="flex justify-center mb-6">
                                    <div className="relative flex w-full p-1 bg-gray-50 rounded">
                                        <span className="relative text-center text-sm font-medium p-1 transition duration-150 ease-in-out w-full">Pay With Card</span>
                                    </div>
                                </div>

                                <div>
                                    <div className="space-y-4">
                                        {/* <!-- Card Number --> */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1" >Card Number <span className="text-red-500">*</span></label>
                                            <input id="card-nr" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="1234 1234 1234 1234" />
                                        </div>
                                        {/* <!-- Expiry and CVC --> */}
                                        <div className="flex space-x-4">
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium mb-1" >Expiry Date <span className="text-red-500">*</span></label>
                                                <input id="card-expiry" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="MM/YY" />
                                            </div>
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium mb-1" >CVC <span className="text-red-500">*</span></label>
                                                <input id="card-cvc" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="CVC" />
                                            </div>
                                        </div>
                                        {/* <!-- Amount --> */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1" >Amount<span className="text-red-500">*</span></label>
                                            <input onChange={(e) => setAmount(Number(e.currentTarget.value))} id="card-name" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="number" placeholder="$150 - Ex" />
                                        </div>
                                        {/* <!-- Name on Card --> */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1" >Name on Card <span className="text-red-500">*</span></label>
                                            <input id="card-name" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="John Doe" />
                                        </div>
                                        {/* <!-- Email --> */}
                                        <div>
                                            <label className="block text-sm font-medium mb-1" >Email <span className="text-red-500">*</span></label>
                                            <input id="card-email" className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" placeholder="john@company.com" />
                                        </div>
                                    </div>
                                    {/* <!-- Form footer --> */}
                                    <div className="mt-6">
                                        <div className="mb-4">
                                            <button onClick={handlePayment} className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">Donate</button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Donate;
