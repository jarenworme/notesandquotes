import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTableList } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { AuthContext } from "../../context/AuthContext";
import "../styles/nav-bar.css";


export default function NavBar() {
    // set up variable for navigation
    const navigate = useNavigate();

    // navigation functions
    const navigateHome = () => navigate('/home');
    const navigateUserPieces = () => navigate('/userPieces');
    const navigateUserSets = () => navigate('/userSets');

    // access Context for Authentication for showing admin panel
    const { authData, setAuthData } = useContext(AuthContext);

    // function to sign out the signed-in admin user
    const signout = async () => {
        try {
            await signOut(auth);
            localStorage.clear();
            setAuthData({ name: null, userID: null, isAuth: false });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className='nav-wrapper'>
            <div className='nav-bar'>
                <div className='nav-left-wrapper'>
                    <h2>logo</h2>
                </div>
                <div className='nav-right-wrapper'>
                    <button className='nav-button' onClick={navigateUserPieces}>
                        <p className='nav-text'>Link1</p>
                    </button>
                    <button className='nav-button' onClick={navigateUserSets}>
                        <p className='nav-text'>Link2</p>
                        <FontAwesomeIcon icon={faTableList} className='nav-icon-nested' size='2x' />
                    </button>
                    <FontAwesomeIcon icon={faHome} className='nav-icon nav-icon-home' size='2x' onClick={navigateHome} />
                </div>
            </div>
            { authData.isAuth && (
                <div className='admin-panel'>
                    <h4>Notes & Quotes Admin Panel</h4>
                    <button>Add Guest</button>
                    <button>Add Podcast</button>
                    <button onClick={signout}>sign out</button>
                </div>
            ) }
        </div>
    );
}
