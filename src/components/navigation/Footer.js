import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faTiktok, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import '../styles/footer.css';

import flogo from "../../assets/logos/Logo3.png";
import banneryt from "../../assets/icons/socialBannerYouTube.png";
import bannersp from "../../assets/icons/socialBannerSpotify.png";
import bannerap from "../../assets/icons/socialBannerApple.png";
import banneram from "../../assets/icons/socialBannerAmazon.png";


export default function Footer () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateLogin = () => navigate('/adminLogin', { replace: false });


    return (
        <div className="footer-wrapper">
            <div className="footer-top-wrapper">
                <div className="footer-left-wrapper">
                    <div className="footer-img-wrapper">
                        <img src={flogo} alt='logo' className='footer-img' />
                    </div>
                    <p className="footer-text">The Notes and Quotes Podcast</p>
                    <a className="footer-text">notesandquotespodcast@gmail.com</a>
                    <button className="footer-admin-btn" onClick={navigateLogin}>- admin login -</button>
                    <div className="footer-social-wrapper">
                        <a 
                            href="https://www.instagram.com/notesandquotespod/" 
                            className="footer-social-a" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faInstagram} className='footer-icon' size='lg' />                        
                        </a>
                        <a 
                            href="https://www.youtube.com/@NotesandQuotesPod" 
                            className="footer-social-a" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faYoutube} className='footer-icon' size='lg' />                        
                        </a>
                        <a 
                            href="https://www.tiktok.com/@notesandquotespod" 
                            className="footer-social-a" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faTiktok} className='footer-icon' />                        
                        </a>
                        <a 
                            href="https://www.linkedin.com/company/notes-quotes-podcast/posts/?feedView=all&viewAsMember=true" 
                            className="footer-social-a" 
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faLinkedin} className='footer-icon' size='lg' />                        
                        </a>
                    </div>
                </div>
                <div className="footer-right-wrapper">
                    <h2 className="footer-title">By one 20-something.</h2>
                    <h2 className="footer-title">For every 20-something.</h2>
                    <div className="footer-streaming-links-wrapper">
                        <a className="footer-streaming-link">.
                        </a>
                    </div>
                    <div className="footer-cta-wrapper">
                        <a 
                            href="https://www.patreon.com/NotesandQuotesPodcast" 
                            className="footer-cta"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            Join our Patreon community!
                        </a>
                    </div>
                </div>
            </div>
            <p className="footer-copy-text">
                &copy; {new Date().getFullYear()} Notes & Quotes. All rights reserved.
            </p>
        </div>
    );
}
