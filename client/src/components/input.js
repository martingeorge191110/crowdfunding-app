import React from "react";


const Input = ({name, type, style, setInput, value, classes}) => {


   return (
      <>
         <input
            name={name || ""}
            type={type}
            value={value}
            onChange={(e) => setInput(e.currentTarget.value)}
            className={`${style} ${classes || ""}`}
         />
      </>
   );
}

export default Input
