import React from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTableList } from '@fortawesome/free-solid-svg-icons';
import "../styles/nav-bar.css"


export default function NavBar () {
    // init navigate variable for page navigation
    const navigate = useNavigate();
    
    // navigation functions
    const navigateHome = () => navigate('/home', { replace: false });
    const navigateUserPieces = () => navigate('/userPieces', { replace: false });
    const navigateUserSets = () => navigate('/userSets', { replace: false });

    return (
        <div className='nav-bar'>
            <div className='nav-left-wrapper'>
                <h2>logo</h2>
            </div>
            <div className='nav-right-wrapper'>
                <button className='nav-button' onClick={navigateUserPieces}>
                    <p className='nav-text'>Pieces</p>              
                </button>
                <button className='nav-button' onClick={navigateUserSets}>
                    <p className='nav-text'>Sets</p>
                    <FontAwesomeIcon icon={faTableList} className='nav-icon-nested' size='2x' />
                </button>
                <FontAwesomeIcon icon={faHome} className='nav-icon nav-icon-home' size='2x' onClick={navigateHome} />
            </div>
        </div>
    );
}
