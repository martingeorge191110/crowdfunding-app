

/**
 * Function Utility to get User token from Cookies
 */

function getCookie(name) {
   const cookies = document.cookie.split(";");
   let token = null;
   cookies.forEach((element) => {
      if (element.slice(0, 5) === name)
         token = element.slice(7);
         
   });
   return token;
}

export {
   getCookie
}