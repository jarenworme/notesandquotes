import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDown, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlay } from '@fortawesome/free-regular-svg-icons';
import { useFetchPodcasts } from "../../hooks/useFetchPodcasts";
import { useDeletePodcast } from "../../hooks/useDeletePodcast";
import '../styles/episodes.css';
import '../styles/loading.css';


import mic from "../../assets/images/miczoomsharp.jpg"


export default function EpisodesClimateJustice() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // navigation functions
    const navigatePodcast = (epnum) => {
        navigate(`/podcast/${epnum}`, { replace: false });
    }

    // ref variable to only call useEffect once in testing
    const fetchCalled = useRef(false);

    const { authData } = useContext(AuthContext);

    const {
        podcasts,
        loadingFetch,
        morePodcastsAvailable,
        fetchPodcasts,
        updatePodcastsOnDelete,
        loadMorePodcasts
    } = useFetchPodcasts('isClimateJustice');

    const { deletePodcast, loadingDelete } = useDeletePodcast();

    // fetch initial set batch on mount and load filter arrays
    useEffect(() => {
        if (!fetchCalled.current && podcasts.length === 0) {
            fetchPodcasts(false, null, "isFav");
            fetchCalled.current = true;
        }
    }, [fetchPodcasts, podcasts.length]);

    const handleDelete = async (pid) => {
        if (window.confirm("Are you sure you want to delete this episode?")) {
            await deletePodcast(pid);
            updatePodcastsOnDelete();
        }
    };

    const loadmore = () => {
        loadMorePodcasts();
    }


    return (
        <div className="ep-wrapper">
            <div className="ep-pillar-block1 cj-background">
                <h1 className="ep-pillar-block1-title">CLIMATE JUSTICE</h1>
                <div className="ep-pillar-block1-blurb1">
                    <h2 className="ep-pillar-block1-subtitle">Welcome to our Climate Justice pillar</h2>
                    <p className="ep-pillar-block1-text">Climate change isn't just an environmental issue — it's about people, power, 
                        and justice. In this pillar, we unpack how climate change connects to inequality, history, and everyday life. 
                        As someone passionate about climate justice, Naomi aims to break things down in a way that's honest, 
                        relatable, and action-focused. This space is for anyone wanting to understand the bigger picture and explore 
                        how we can all play a part in creating a more just, sustainable world for our collective future.
                    </p>
                </div>
                <div className="ep-pillar-block1-blurb2">
                    <p className="ep-pillar-block1-quote">"There are no passengers on Spaceship Earth. We are all crew."</p>
                    <p className="ep-pillar-block1-text-light">Marshall McLuhan</p>
                </div>
            </div>
            <div className="epall-block5">
                <h3 className="epall-block5-title">Episodes</h3>
                <div className="ep-podcasts-wrapper">
                    { podcasts.map(podcast => (
                        <div key={podcast.id} className="ep-podcast">
                            <p className="ep-podcast-epnum">#{podcast.episodeNum}</p>
                            <button className="ep-podcast-title"  onClick={() => navigatePodcast(podcast.episodeNum)}>
                                {podcast.title}
                            </button>
                            <a href={podcast.linkYT} className="ep-podcast-icon-wrapper" target="_blank" rel="noreferrer">
                                <FontAwesomeIcon icon={faCirclePlay} className='ep-podcast-icon' size='xl' />
                            </a>
                            { (authData.isAuth && !loadingDelete) && 
                                <button onClick={() => handleDelete(podcast.id)} className="ep-podcast-icon-wrapper">
                                    <FontAwesomeIcon icon={faTrash} className='ep-podcast-icon' size='xl' />
                                </button>
                            }
                        </div>
                    ))}
                </div>
                { morePodcastsAvailable && 
                    <button className="ep-load-wrapper" onClick={loadmore}>
                        <FontAwesomeIcon icon={faCircleDown} className='ep-load-icon' size='xl' />
                        { !loadingFetch && <p className="ep-load-text">View more</p>}
                    </button>
                }
            </div>
            <div className="epall-hr-wrapper">
                <hr className="epall-hr" />
            </div>
            <div className="epall-block6">
                <div className="epall-block6-left-wrapper">
                    <h2 className="epall-block6-title">We want to hear from you!</h2>
                    <p className="epall-block6-text">Did you hate it? Did you love it? Tell us, tell us!</p>
                    <a 
                        href="https://forms.gle/4nBjMy1tGazhuPsUA" 
                        className="epall-block6-cta" 
                        target="_blank" 
                        rel="noreferrer"
                    >
                        Fill out our 1 minute listener survey!
                    </a>
                </div>
                <div className="epall-block6-right-wrapper">
                    <img src={mic} alt="podcast" className="epall-block6-img" />
                </div>
            </div>
        </div>
    );
}
