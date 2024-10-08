import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { userProfileApi } from "../services/user";
import PageLoader from "../components/pageLoading";
import NavBar from "../components/navBar";
import ToggleNav from "../components/toggleNav";

const Profile = () => {
  const token = useSelector((state) => state.user.token);

  const navBar = useRef(null)

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const pageApis = async () => {
    try {
      const response = await userProfileApi(token);

      if (response.success) {
        setLoading(false);
        setUser(response.data);
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  useLayoutEffect(() => {
    if (loading)
      pageApis();
  }, [loading]);

  const navToggleFunc = () => {
    navBar.current.classList.toggle("left-0")
  }

  return (
    <>
      {loading ? (
        <PageLoader />
      ) : (
          <><NavBar refrenece={navBar}/>
        <section className="pt-16 bg-blueGray-50 flex flex-col items-center justify-center">
        <div className="lg:block lg:mb-6 flex flex-row justify-between items-center">
               <ToggleNav clickFunc={navToggleFunc}/>
               <h1 className="text-4xl mr-14 lg:mr-0 font-bold text-center text-indigo-400  md:mr-60 sm:mr-32">User Profile</h1>
            </div>
          <div className="w-full mt-20 lg:mt-0 lg:w-4/12 px-4 mx-auto">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full px-4 flex justify-center">
                    <div className="relative">
                      {user && user.avatar ? (
                        <img
                          src={user.avatar}
                          alt="Profile"
                          className="shadow-xl rounded-full align-middle border-2 border-blueGray-300 -m-16 -mb-56 -ml-20 lg:-ml-16 min-w-36 h-36 object-cover"
                        />
                      ) : (
                        <div className="w-36 h-36 bg-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <div className="w-full px-4 text-center mt-20">
                    <div className="text-center mt-12">
                      <h3 className="text-3xl font-semibold leading-normal text-blueGray-700 mb-2">
                        {user ? `${user.f_name} ${user.l_name}` : "Name not available"}
                      </h3>
                      <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                        <i className="fas fa-envelope mr-2 text-lg text-blueGray-400"></i>
                        {user ? user.email : "Email not available"}
                      </div>
                      <div className="mb-2 text-blueGray-600">
                        <i className="fas fa-venus-mars mr-2 text-lg text-blueGray-400"></i>
                        {user ? user.gender : "Gender not specified"}
                      </div>
                      <div className="mb-4 text-blueGray-700">
                        <p>{user && "Created At -" + ' ' + user.createdAt}</p>
                        <p>{user && "Last Updated -" + ' ' + user.updatedAt}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                        {user ? user.bio : "No additional bio provided."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> </>
      )}
    </>
  );
};

export default Profile;
