import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
// import { faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from "../../context/AuthContext";
import '../styles/footer.css';


export default function Footer () {
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
        <div className="footer-wrapper">
            <p>image to go here</p>
            <p>Notes & Quotes</p>
            <p>social links</p>
            <p>podcast links</p>
            <button onClick={navigateLogin}>admin login</button>
            {authData.isAuth && <button onClick={navigateRegister}>admin register</button>}
            <p>
                &copy; {new Date().getFullYear()} Notes & Quotes. All rights reserved.
            </p>
        </div>
    );
}
