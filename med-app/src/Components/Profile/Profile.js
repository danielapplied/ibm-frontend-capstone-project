import React, { useEffect, useState } from "react";
import MyComponent from '../ProfileCard/ProfileCard';
import Reports from '../ReportsLayout/ReportsLayout';   

function Profile() {
  const [currentComponent, setCurrentComponent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => { 
        const loggedIn = sessionStorage.getItem("loggedIn");
        console.log(loggedIn);
        if (loggedIn==="true") {
              setIsLoggedIn(true);
            }
          }, []);

  const loadComponent1 = () => {
    setCurrentComponent(<MyComponent />);
  };

 const loadComponent2 = () => {
    setCurrentComponent(<Reports />);
  };

  return (
    <div div style={{ marginTop: '5%' ,width:'30%', marginLeft:'87%'}}>
      { isLoggedIn && (
        <>
        <div>
         <a 
          href="#"
          onClick={(e) => {
          e.preventDefault();
          loadComponent1();
          }}
         >
        Your Profile
      </a> 
      </div>
      <div>  
         <a 
          href="#"
          onClick={(e) => {
          e.preventDefault();
          loadComponent2();
          }}
      >
       Your Reports
      </a> 
      </div>
      <div>
        {currentComponent}
      </div>
        </>
      )}
    </div>
  );
}

export default Profile;