import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars, faX } from '@fortawesome/free-solid-svg-icons';
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
    const navigateAboutNaomi = () => navigate('/aboutNaomi', { replace: false });
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

    // state variables
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showEpisodesMobile, setShowEpisodesMobile] = useState(false);

    // function to change if menu is shown or not for mobile
    const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

    // function to change if episodes are shown in mobile menu
    const toggleShowEpisodesMobile = () => setShowEpisodesMobile(prev => !prev);

    const handleNav = (callback) => {
        callback();
        setIsMobileMenuOpen(false);
        setShowEpisodesMobile(false);
    };

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
                <button className="hamburger" onClick={toggleMobileMenu}>
                    { isMobileMenuOpen ? 
                        <FontAwesomeIcon icon={faX} className='nav-icon-mobile' size='xl' />
                    :
                        <FontAwesomeIcon icon={faBars} className='nav-icon-mobile' size='xl' />
                    }
                </button>
                <div className={"nav-right-wrapper"}>
                    <button className='nav-btn' onClick={() => handleNav(navigateOurValues)}>Our Values</button>
                    <div className="nav-dropdown">
                        <button className="nav-btn">Episodes</button>
                        <div className="nav-dropdown-content">
                            <button onClick={() => handleNav(navigateEpisodesAll)}>All Episodes</button>
                            <button onClick={() => handleNav(navigateEpisodesFavs)}>Naomi's Favs</button>
                            <button onClick={() => handleNav(navigateEpisodesMentalHealth)}>Mental Health</button>
                            <button onClick={() => handleNav(navigateEpisodesPersonalGrowth)}>Personal Growth</button>
                            <button onClick={() => handleNav(navigateEpisodesSocialJustice)}>Social Justice</button>
                            <button onClick={() => handleNav(navigateEpisodesClimateJustice)}>Climate Justice</button>
                        </div>
                    </div>
                    <button className='nav-btn' onClick={() => handleNav(navigateGuests)}>Guests</button>
                    <button className='nav-btn' onClick={() => handleNav(navigateCommunity)}>Community</button>
                    <button className='nav-btn' onClick={() => handleNav(navigateAboutNaomi)}>About Naomi</button>
                    <button className='nav-btn' onClick={() => handleNav(navigateGetInvolved)}>Get Involved</button>
                    <button className='nav-icon-wrapper'>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className='nav-icon' size='xl' />
                    </button>
                </div>
            </div>
            { isMobileMenuOpen &&
                    <div className="nav-mobile-menu">
                        <div className="nav-mobile-menu-top">
                            <button className='nav-btn-mobile' onClick={() => handleNav(navigateOurValues)}>Our Values</button>
                            <button className={`nav-btn-mobile ${showEpisodesMobile ? "underline" : ""}`} onClick={toggleShowEpisodesMobile}>Episodes</button>
                            { showEpisodesMobile &&
                            <div className='nav-ep-btn-mobile-wrapper'>
                                <button className='nav-ep-btn-mobile' onClick={() => handleNav(navigateEpisodesAll)}>All Episodes</button>
                                <button className='nav-ep-btn-mobile' onClick={() => handleNav(navigateEpisodesFavs)}>Naomi's Favs</button>
                                <button className='nav-ep-btn-mobile' onClick={() => handleNav(navigateEpisodesMentalHealth)}>Mental Health</button>
                                <button className='nav-ep-btn-mobile' onClick={() => handleNav(navigateEpisodesPersonalGrowth)}>Personal Growth</button>
                                <button className='nav-ep-btn-mobile' onClick={() => handleNav(navigateEpisodesSocialJustice)}>Social Justice</button>
                                <button className='nav-ep-btn-mobile' onClick={() => handleNav(navigateEpisodesClimateJustice)}>Climate Justice</button>
                            </div>}
                            <button className='nav-btn-mobile' onClick={() => handleNav(navigateGuests)}>Guests</button>
                            <button className='nav-btn-mobile' onClick={() => handleNav(navigateCommunity)}>Community</button>
                            <button className='nav-btn-mobile' onClick={() => handleNav(navigateAboutNaomi)}>About Naomi</button>
                            <button className='nav-btn-mobile' onClick={() => handleNav(navigateGetInvolved)}>Get Involved</button>
                        </div>
                        { authData.isAuth && (
                            <div className="nav-mobile-menu-bottom">
                                <button className='nav-admin-btn-mobile' onClick={() => handleNav(navigateUploadGuest)}>Add Guest</button>
                                <button className='nav-admin-btn-mobile' onClick={() => handleNav(navigateUploadPodcast)}>Add Podcast</button>
                                <button className='nav-admin-btn-mobile' onClick={() => handleNav(navigateEditFeatured)}>Edit Featured</button>
                                <button className='nav-signout-btn-mobile' onClick={() => handleNav(signout)}>Sign Out</button>
                            </div>
                        ) }
                    </div>
                }
            { authData.isAuth && (
                <div className={`nav-admin-panel ${isMobileMenuOpen ? "admin-no-display" : ""}`}>
                    <h4 className='nav-admin-text'>Admin Panel</h4>
                    <h4 className='nav-admin-text-mobile'>Open Menu for Admin Panel</h4>
                    <div className='nav-right-wrapper'>
                        <button className='nav-admin-btn' onClick={() => handleNav(navigateUploadGuest)}>Add Guest</button>
                        <button className='nav-admin-btn' onClick={() => handleNav(navigateUploadPodcast)}>Add Podcast</button>
                        <button className='nav-admin-btn' onClick={() => handleNav(navigateEditFeatured)}>Edit Featured</button>
                        <button className='nav-signout-btn' onClick={() => handleNav(signout)}>Sign Out</button>
                    </div>
                </div>
            ) }
        </div>
    );
}
