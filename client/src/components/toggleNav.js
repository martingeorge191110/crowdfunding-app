import React from "react";


const ToggleNav = ({clickFunc}) => {

   return (
      <>
         <div onClick={clickFunc}  className="lg:hidden cursor-pointer hover:scale-125 transition ease-in-out  w-8 h-8 m-8 rounded-sm flex flex-col justify-center items-center p-1.5">
               <span className="block w-full my-0.5 h-[7px] bg-black"></span>
               <span className="block w-full my-1 h-[9px] bg-black"></span>
               <span className="block w-full my-0.5 h-[7px] bg-black"></span>
         </div>
      </>
   )
}

export default ToggleNav;
