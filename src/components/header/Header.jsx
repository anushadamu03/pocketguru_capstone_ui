import React, { useEffect, useState } from "react";
import "./header.scss";

import { Link, useNavigate } from "react-router-dom";

const Header = ({ setupdateLogin, updateLogin }) => {
    const [authToken, setAuthToken] = useState('');
    const [userRole, setUserRole] = useState('');
    const navigate = useNavigate(); 

   
    const getTokenAndRole = () => {
        const auth_token = localStorage.getItem('web_token');
        const role = localStorage.getItem('web_userrole');
        setAuthToken(auth_token);
        setUserRole(role);
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('web_token'); 
        localStorage.removeItem('web_userrole'); 
        setAuthToken(''); 
        setUserRole('');
        setupdateLogin(prev => !prev);
        navigate('/login');
    };

    useEffect(() => {
        getTokenAndRole();
    }, [updateLogin]);

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li> 

                    {authToken ? (
                        <>
                           

                            {userRole === 'Mentor' && (
                                <li><Link to="/students">Students</Link></li>
                            )}

                            {userRole === 'Student' && (
                                <li><Link to="/experts">Experts</Link></li>
                            )}

                            <li><Link to="/user-dashboard">Dashboard</Link></li>
                            <li onClick={handleLogout} style={{ cursor: 'pointer',color:"white" }}>Logout</li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/sign-up">Signup</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;

