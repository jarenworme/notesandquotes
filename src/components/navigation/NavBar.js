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
    const navigateHome = () => navigate('/', { replace: false });
    const navigatePodcasts = () => navigate('/episodes');
    const navigateUserSets = () => navigate('/userSets');
    const navigateEditFeatured = () => navigate('/editFeatured', { replace: false });
    const navigateUploadPodcast = () => navigate('/uploadPodcast', { replace: false });
    const navigateUploadGuest = () => navigate('/uploadGuest', { replace: false });

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
                    <button className='nav-button' onClick={navigatePodcasts}>
                        <p className='nav-text'>Episodes</p>
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
                    <button onClick={navigateUploadGuest}>Add Guest</button>
                    <button onClick={navigateUploadPodcast}>Add Podcast</button>
                    <button onClick={navigateEditFeatured}>Edit Featured</button>
                    <button onClick={signout}>sign out</button>
                </div>
            ) }
        </div>
    );
}
