import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase-config";
import { AuthContext } from "../../context/AuthContext";
import "../styles/nav-bar.css";

import logo from "../../assets/logos/Logo1.png"


export default function NavBar() {
    // set up variable for navigation
    const navigate = useNavigate();

    // navigation functions
    const navigateHome = () => navigate('/', { replace: false });
    const navigateOurValues = () => navigate('/ourValues', { replace: false });
    const navigateEpisodesAll = () => navigate('/episodes/all', { replace: false });
    const navigateEpisodesFavs = () => navigate('/episodes/naomisFavs', { replace: false });
    const navigateEpisodesMentalHealth = () => navigate('/episodes/mentalHealth', { replace: false });
    const navigateEpisodesPersonalGrowth = () => navigate('/episodes/personalGrowth', { replace: false });
    const navigateEpisodesSocialJustice = () => navigate('/episodes/socialJustice', { replace: false });
    const navigateEpisodesClimateJustice = () => navigate('/episodes/climateJustice', { replace: false });
    const navigateGetInvolved = () => navigate('/getInvolved', { replace: false });
    const navigateGuests = () => navigate('/guests', { replace: false });
    const navigateCommunity  = () => navigate('/community', { replace: false });

    const navigateEditFeatured = () => navigate('/EditFeatured', { replace: false });
    const navigateUploadPodcast = () => navigate('/UploadPodcast', { replace: false });
    const navigateUploadGuest = () => navigate('/UploadGuest', { replace: false });

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
                <button className='nav-logo-wrapper' onClick={navigateHome}>
                    <img src={logo} alt='logo' className='nav-logo' />
                </button>
                <div className='nav-right-wrapper'>
                    <button className='nav-btn' onClick={navigateOurValues}>Our Values</button>
                    <button className='nav-btn' onClick={navigateEpisodesAll}>Episodes</button>
                    <button className='nav-btn' onClick={navigateGuests}>Guests</button>
                    <button className='nav-btn' onClick={navigateCommunity}>Community</button>
                    <button className='nav-btn' onClick={navigateCommunity}>About Naomi</button>
                    <button className='nav-btn' onClick={navigateCommunity}>Get Involved</button>
                    <button className='nav-icon-wrapper'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='nav-icon' size='xl' />
                    </button>
                </div>
            </div>
            { authData.isAuth && (
                <div className='nav-admin-panel'>
                    <h4 className='nav-admin-text'>Admin Panel</h4>
                    <div className='nav-right-wrapper'>
                        <button className='nav-admin-btn' onClick={navigateUploadGuest}>Add Guest</button>
                        <button className='nav-admin-btn' onClick={navigateUploadPodcast}>Add Podcast</button>
                        <button className='nav-admin-btn' onClick={navigateEditFeatured}>Edit Featured</button>
                        <button className='nav-signout-btn' onClick={signout}>Sign Out</button>
                    </div>
                </div>
            ) }
        </div>
    );
}
