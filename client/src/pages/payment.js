import React from "react";


const Donate = () => {



   return (
      <>
<section className="antialiased bg-gray-100 text-gray-600 min-h-screen flex items-center justify-center p-4">
    <div className="h-full">
        {/* <!-- Pay component --> */}
        <div>

            <div className="relative px-4 sm:px-6 lg:px-8  max-w-lg mx-auto" x-data="{ card: true }">
                <div className="bg-white px-8 p-6 rounded-md rounded-b shadow-lg">

                    <div className="text-center mb-6">
                        <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">Front-End Learning 🔥</h1>
                        <div className="text-sm">
                            Learn how to create real web apps using HTML & CSS. Code templates included.
                        </div>
                    </div>
                    <div className="flex justify-center mb-6">
                        <div className="relative flex w-full p-1 bg-gray-50 rounded">
                            <span className="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                                <span className="absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out" ></span>
                            </span>
                            <button className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2">Pay With Card</button>
                            <button className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none focus-visible:ring-2">Pay With PayPal</button>
                        </div>
                    </div>

                    <div>
                        <div class="space-y-4">
                            {/* <!-- Card Number --> */}
                            <div>
                                <label class="block text-sm font-medium mb-1" for="card-nr">Card Number <span class="text-red-500">*</span></label>
                                <input id="card-nr" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="1234 1234 1234 1234" />
                            </div>
                            {/* <!-- Expiry and CVC --> */}
                            <div class="flex space-x-4">
                                <div class="flex-1">
                                    <label class="block text-sm font-medium mb-1" for="card-expiry">Expiry Date <span class="text-red-500">*</span></label>
                                    <input id="card-expiry" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="MM/YY" />
                                </div>
                                <div class="flex-1">
                                    <label class="block text-sm font-medium mb-1" for="card-cvc">CVC <span class="text-red-500">*</span></label>
                                    <input id="card-cvc" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="CVC" />
                                </div>
                            </div>
                            {/* <!-- Name on Card --> */}
                            <div>
                                <label class="block text-sm font-medium mb-1" for="card-name">Name on Card <span class="text-red-500">*</span></label>
                                <input id="card-name" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="text" placeholder="John Doe" />
                            </div>
                            {/* <!-- Email --> */}
                            <div>
                                <label class="block text-sm font-medium mb-1" for="card-email">Email <span class="text-red-500">*</span></label>
                                <input id="card-email" class="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full" type="email" placeholder="john@company.com" />
                            </div>
                        </div>
                        {/* <!-- Form footer --> */}
                        <div class="mt-6">
                            <div class="mb-4">
                                <button class="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">Pay $253.00</button>
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
