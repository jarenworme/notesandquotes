import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchPodcast } from "../../hooks/useFetchPodcast";
import '../styles/podcast-details.css';


export default function PodcastDetails() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateEpisodesNaomisFavs = () => navigate('/episodes/naomisFavs', { replace: false });
    const navigateEpisodesMentalHealth = () => navigate('/episodes/mentalHealth', { replace: false });
    const navigateEpisodesPersonalGrowth = () => navigate('/episodes/personalGrowth', { replace: false });
    const navigateEpisodesSocialJustice = () => navigate('/episodes/socialJustice', { replace: false });
    const navigateEpisodesClimateJustice = () => navigate('/episodes/climateJustice', { replace: false });

    const fetchCalled = useRef(false);
    
    const {
        podcastInfo,
        fetchPodcast
    } = useFetchPodcast();

    // input parameters for determining if to load register or login on mount (1 for register, 2 for login)
    const { pid } = useParams();

    useEffect(() => {
        if(pid.length > 0 && !fetchCalled.current){
            fetchPodcast(pid);
        }
    }, [pid, fetchPodcast]);

    return (
        <div className="pd-wrapper">
            {podcastInfo && 
                <div className="pd-subwrapper">
                    <h2 className="pd-subtitle">Ep #{podcastInfo.episodeNum}</h2>
                    <h1 className="pd-title">{podcastInfo.title}</h1>
                    <a 
                        className="pd-img-wrapper"
                        href={podcastInfo.linkYT} 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        <img src={podcastInfo.imgurl} alt="podcast" className="pd-img"/>
                    </a>
                    <p className="pd-text">{podcastInfo.description}</p>
                    <div className="pd-tags">
                        {podcastInfo.isFav && 
                            <button className="pd-tag-fav" onClick={navigateEpisodesNaomisFavs}>Naomi's fav</button>
                        }
                        {podcastInfo.isMentalHealth && 
                            <button className="pd-tag" onClick={navigateEpisodesMentalHealth}>mental health</button>
                        }
                        {podcastInfo.isPersonalGrowth && 
                            <button className="pd-tag" onClick={navigateEpisodesPersonalGrowth}>personal growth</button>
                        }
                        {podcastInfo.isClimateJustice && 
                            <button className="pd-tag" onClick={navigateEpisodesClimateJustice}>climate justice</button>
                        }
                        {podcastInfo.isSocialJustice && 
                            <button className="pd-tag" onClick={navigateEpisodesSocialJustice}>social justice</button>
                        }
                    </div>
                </div>
            }
        </div>
    );
}
