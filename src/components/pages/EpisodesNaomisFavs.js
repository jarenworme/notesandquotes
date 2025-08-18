import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchPodcasts } from "../../hooks/useFetchPodcasts";
import '../styles/episodes.css';
import '../styles/loading.css';

import facesBackground from "../../assets/images/faces-background-squished.png";
import facesBackgroundmobile from "../../assets/images/faces-background-rotated.png";


export default function EpisodesNaomisFavs() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    const navigateEpisodesAll = () => navigate('/episodes/all', { replace: false });

    // navigation functions
    const navigatePodcast = (epnum) => {
        navigate(`/podcast/${epnum}`, { replace: false });
    }

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);

    const {
        podcasts,
        fetchPodcasts,
    } = useFetchPodcasts('isFav');

    // fetch initial set batch on mount and load filter arrays
    useEffect(() => {
        if (!fetchCalled.current && podcasts.length === 0) {
            fetchPodcasts(false, null, "isFav");
            fetchCalled.current = true;
        }
    }, [fetchPodcasts, podcasts.length]);


    return (
        <div className="ep-wrapper">
            <div className="lp-block5 epfavs-block1-responsive">
                <img src={facesBackground} alt="Faces background" className="lp-block5-img" />
                <img src={facesBackgroundmobile} alt="Faces background" className="lp-block5-img-mobile" />
                <div className="lp-block5-content">
                    <p className="lp-block5-card">A personal look at</p>
                    <button className="lp-block5-btn-favs">Naomi's Favorites</button>
                    <p className="lp-block5-card">episodes</p>
                </div>
            </div>
            <div className="epfavs-block2">
                <p className="epfavs-block2-text">
                    Looking for a place to start or just want to dive into some of the conversations that left a mark on me? This is 
                    where I've gathered a few of my personal favourites — episodes that made me think, feel, or see things in a new 
                    way.
                </p>
            </div>
            <div className="epfavs-block3">
                    { podcasts.map(podcast => (
                        <button key={podcast.id} className="epfavs-block3-card" onClick={() => navigatePodcast(podcast.episodeNum)}>
                            <div className="epfavs-block3-card-img-wrapper">
                                <img src={podcast.imgurl} alt="podcast" className="epfavs-block3-card-img" />
                            </div>
                            <div className="epfavs-block3-card-title-wrapper">
                                <h2 className="epfavs-block3-card-title">{podcast.title}</h2>
                                <p className="epfavs-block3-card-text">{podcast.description}</p>
                                
                            </div>
                            <p className="epfavs-block3-card-footer">#{podcast.episodeNum}</p>
                        </button>
                    ))}
            </div>
            <div className="epfavs-block4">
                <p className="epfavs-block4-text">
                    Looking for a place to start or just want to dive into some of the conversations that left a mark on me? This is 
                    where I've gathered a few of my personal favourites — episodes that made me think, feel, or see things in a new 
                    way.
                </p>
                <button className="epfavs-block4-cta" onClick={navigateEpisodesAll}>Episodes</button>
            </div>
        </div>
    );
}
