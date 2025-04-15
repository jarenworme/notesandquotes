import React from "react";
import { useNavigate } from "react-router-dom";


export default function NotFoundPage() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateLandingPage = () => navigate('/', { replace: false });

    return (
        <div className="p404-wrapper">
            <p className="p404-text">The page you're looking for doesn't exist.</p>
            <button className="p404-button" onClick={navigateLandingPage}>Return to LEGOLog</button>
        </div>
    );
}
