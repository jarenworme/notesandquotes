import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
// import { faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from "../../context/AuthContext";
// import '../styles/landing-page.css';


export default function LandingPage () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    // const navigateAboutUs = () => navigate('/about', { replace: false });
    const navigateLogin = () => navigate('/adminLogin', { replace: false });
    const navigateRegister = () => navigate('/adminRegister', { replace: false });
    // const navigateAuthRegister = () => navigate('/auth/1', { replace: false });
    // const navigateLandingPage = () => navigate('/', { replace: false });
    // const navigatePayments = () => navigate('/payments', { replace: false });

    const { authData } = useContext(AuthContext);

    return (
        <div className="lp-wrapper">
            <h1>line 1</h1>
            <h1>line 2</h1>
            <h1>{authData.userID}</h1>
            { authData.name && <h3>{authData.name}</h3>}
            {authData.isAuth && <h3>authorized</h3>}
            <button onClick={navigateLogin}>admin login</button>
            {authData.isAuth && <button onClick={navigateRegister}>admin register</button>}
        </div>
    );
}
