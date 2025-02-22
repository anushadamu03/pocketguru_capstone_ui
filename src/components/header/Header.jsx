import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./header.css"

const Header = (props) => {
const {setupdateLogin, updateLogin} = props;
   // Function to get the token
  
  const [authToken, setauthToken] = useState('');
   const getToken = () => {
    const auth_token = localStorage.getItem('web_token');
    setauthToken(auth_token)
    // console.log("auth_token=====$$$$$$$$$$$$$",auth_token)
  };

  // console.log("auth_token=====",authToken)

  useEffect(()=>{
    getToken();
  },[updateLogin])

  return (
    <header>
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li> 
        {authToken ? <> <li><Link to="/logout">Logout</Link></li>
         <li>
         <Link to="/experts">Experts</Link>
       </li>
       <li>
         <Link to="/students">Students</Link>
       </li>
       <li>
         <Link to="/dashboard">Dashboard</Link>
       </li> </>  :
        <> 
        <li><Link to="/sign-up">Signup</Link></li>
        <li><Link to="/login">Login</Link></li>
        </>
  }
                   
      </ul>
    </nav>
  </header>
  
  );
};

export default Header;
