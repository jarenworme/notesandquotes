import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';
// import '../styles/landing-page.css';




export default function LandingPage () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateAboutUs = () => navigate('/about', { replace: false });
    const navigateAuth = () => navigate('/auth/2', { replace: false });
    const navigateAuthRegister = () => navigate('/auth/1', { replace: false });
    const navigateLandingPage = () => navigate('/', { replace: false });
    const navigatePayments = () => navigate('/payments', { replace: false });


    return (
        <div className="lp-wrapper">
            <h1>line 1</h1>
            <h1>line 2</h1>
            <h3>line 3</h3>
        </div>
    );
}
