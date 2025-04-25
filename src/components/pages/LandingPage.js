import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
// import { faInstagram, faMedium } from '@fortawesome/free-brands-svg-icons';
import { AuthContext } from "../../context/AuthContext";
import { useFetchFeatured } from "../../hooks/useFetchFeatured";
import '../styles/landing-page.css';

import block2Headshot from "../../assets/images/headshot2.png";
import facesBackground from "../../assets/images/faces-background.png";
import pillar1 from "../../assets/icons/pillar1.png";
import pillar2 from "../../assets/icons/pillar2.png";
import pillar3 from "../../assets/icons/pillar3.png";
import pillar4 from "../../assets/icons/pillar4.png";

export default function LandingPage () {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateEpisodesFavs = () => navigate('/Episodes/NaomisFavs', { replace: false });

    const { authData } = useContext(AuthContext);

    const { featuredInfo, fetchFeatured } = useFetchFeatured();

    // fetch featured data
    useEffect(() => {
        fetchFeatured();
    }, []);

    return (
        <div className="lp-wrapper">
            <div className="lp-block1">
                <div className="lp-shadowed">
                    <h1 className="lp-h1">THE COMMUNITY FOR 20 SOMETHINGS TO FEEL CONNECTED, INFORMED AND SEEN</h1>
                    <button className="lp-cta">NEW EPISODES EVERY TUESDAY!</button>
                </div>
            </div>
            <div className="lp-block2">
                <div className="lp-block2-left">
                    <h2 className="lp-block2-title">THE DECADE OF UNCERTAINTY AND OPPORTUNITY SHOULDN'T BE SUFFERED ALONE</h2>
                    <div className="lp-block2-left-bottom-wrapper">
                        <p className="lp-block2-text">
                            Our 20s are often painted as a time of freedom and adventure, but the reality can be far messier — filled with 
                            self-doubt, big dreams, unexpected challenges, and constant change. It's a decade bursting with potential, but 
                            also layered with questions about who we are, where we're going, and the bigger realities shaping our 
                            generation's future.
                        </p>
                        <p className="lp-block2-text">
                            In times of uncertainty, Naomi has always found comfort and inspiration in quotes — those simple but powerful 
                            words that can offer a spark of clarity when everything else feels overwhelming. Notes & Quotes was born from 
                            that belief: that sometimes a single sentence can open a door to real conversations, healing, and hope.
                        </p>
                    </div>
                </div>
                <div className="lp-block2-right">
                    <div className="lp-block2-right-top-wrapper">
                        <p className="lp-block2-green-text">
                            Each episode starts with a meaningful quote. Whether it's about finding yourself, facing fears, tackling 
                            the realities of social and climate justice, or just surviving the rollercoaster of life in your 20s 
                            today. Naomi shares her own reflections and invites guests to bring fresh perspectives, keeping every 
                            conversation real, relatable, and specifically for you.
                        </p>
                        <div className="lp-block2-image-wrapper"> 
                            <img src={block2Headshot} alt='Naomi Recording' className='lp-block2-img' />
                        </div>
                    </div>
                    <p className="lp-block2-text-wide">
                        With its candid atmosphere and thoughtful insights, Notes & Quotes is here to inspire, inform, and remind you 
                        that you're not alone — and you don't have to navigate this wild decade by yourself.
                    </p>
                </div>
            </div>
            {featuredInfo && <div className="lp-block3">
                <div className="lp-block3-left-wrapper">
                    <p className="lp-block3-episode-num">Ep#{featuredInfo.epnum}</p>
                    <a className="lp-block3-title">{featuredInfo.title}</a>
                    <button className="lp-block3-img-wrapper">
                        <img src={featuredInfo.imgurl} alt="podcast" className="lp-block3-img" />
                    </button>
                </div>
                <div className="lp-block3-right-wrapper">
                    <h3 className="lp-block3-quote-title">QUOTE OF THE WEEK</h3>
                    <p className="lp-block3-quote">"{featuredInfo.quote}"</p>
                    <p className="lp-block3-quote">-{featuredInfo.quoteauthor}</p>
                </div>
            </div>}
            <div className="lp-block4">
                <div className="lp-block4-content-wrapper">
                    <div className="lp-block4-pillar">
                        <img src={pillar1} alt="pillar1" className="lp-block4-img"/>
                        <hr />
                        <p className="lp-block4-text">MENTAL HEALTH</p>
                        <hr />
                    </div>
                    <div className="lp-block4-pillar">
                        <img src={pillar1} alt="pillar1" className="lp-block4-img"/>
                        <hr />
                        <p className="lp-block4-text">PERSONAL GROWTH</p>
                        <hr />
                    </div>
                    <div className="lp-block4-pillar">
                        <img src={pillar1} alt="pillar1" className="lp-block4-img"/>
                        <hr />
                        <p className="lp-block4-text">CLIMATE JUSTICE</p>
                        <hr />
                    </div>
                    <div className="lp-block4-pillar">
                        <img src={pillar1} alt="pillar1" className="lp-block4-img"/>
                        <hr />
                        <p className="lp-block4-text">SOCIAL JUSTICE</p>
                        <hr />
                    </div>
                </div>
                <a href="https://www.youtube.com/@NotesandQuotesPod/playlists" className="lp-block4-cta" target="_blank">
                    Listen to curated playlists
                </a>
                <h2 className="lp-block4-title">OUR PILLARS</h2>
            </div>
            <div className="lp-block5">
                <img src={facesBackground} alt="Faces background" className="lp-block5-img" />
                <div className="lp-block5-content">
                    <p className="lp-block5-card">A personal look at</p>
                    <button onClick={navigateEpisodesFavs} className="lp-block5-btn">Naomi's Favorites</button>
                    <p className="lp-block5-card">episodes</p>
                </div>
            </div>
     </div>
    );
}
