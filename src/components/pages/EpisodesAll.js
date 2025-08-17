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

//reimport useState and faMagnifyingGlass when implementing searching

import headshot3 from "../../assets/images/ig.png";
import mic from "../../assets/images/miczoomsharp.jpg"


export default function EpisodesAll() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // navigation functions
    const navigateEpisodesMentalHealth = () => navigate('/episodes/mentalHealth', { replace: false });
    const navigateEpisodesPersonalGrowth = () => navigate('/episodes/personalGrowth', { replace: false });
    const navigateEpisodesSocialJustice = () => navigate('/episodes/socialJustice', { replace: false });
    const navigateEpisodesClimateJustice = () => navigate('/episodes/climateJustice', { replace: false });

    const navigatePodcast = (epnum) => {
        navigate(`/podcast/${epnum}`, { replace: false });
    }

    // state variables
    // const [searchTerm, setSearchTerm] = useState("");

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
    } = useFetchPodcasts('all');

    const { deletePodcast, loadingDelete } = useDeletePodcast();

    // fetch initial set batch on mount and load filter arrays
    useEffect(() => {
        if (!fetchCalled.current && podcasts.length === 0) {
            fetchPodcasts(false, null, "isFav");
            fetchCalled.current = true;
        }
    }, [fetchPodcasts, podcasts.length]);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("search entered");
    // };

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
            <div className="epall-block1">
                <div className="epall-block1-img-wrapper">
                    <img src={headshot3} alt="podcast" className="epall-block1-img" />
                </div>
                <div className="epall-block1-content-wrapper">
                    <h1 className="epall-block1-title">EPISODES</h1>
                    <p className="epall-block1-text">
                        Welcome to the heart of the pod — the episodes. Each conversation here is designed with you in mind, offering 
                        stories, insights, and reflections to keep you company as you navigate your own path. Whether you're on a walk,
                        commuting, cooking dinner, or simply unwinding, these episodes are here to meet you where you are. Think of 
                        them as little pockets of inspiration, honesty, education and reassurance for the days you need it most (and 
                        even the ones you don't). Press play and make yourself at home.
                    </p>
                    <h2 className="epall-block1-subtitle">New episodes every Tuesday!</h2>
                </div>
            </div>
            <div className="epall-block2">
                <h2 className="epall-block2-title">Thematic Playlists</h2>
                <div className="epall-block2-card-wrapper">
                    <button className="epall-block2-card eac1" onClick={navigateEpisodesMentalHealth}>
                        <h4 className="epall-block2-card-text">Mental Health</h4>
                    </button>
                    <button className="epall-block2-card eac2" onClick={navigateEpisodesPersonalGrowth}>
                        <h4 className="epall-block2-card-text">Personal Growth</h4>
                    </button>
                    <button className="epall-block2-card eac3" onClick={navigateEpisodesClimateJustice}>
                        <h4 className="epall-block2-card-text">Climate Justice</h4>
                    </button>
                    <button className="epall-block2-card eac4" onClick={navigateEpisodesSocialJustice}>
                        <h4 className="epall-block2-card-text">Social Justice</h4>
                    </button>
                </div>
            </div>
            <div className="epall-block3">
                <h2 className="epall-block3-text">
                    The commmunity for 20 something's to feel connected, informed and seen.
                </h2>
            </div>
            <div className="epall-block4">
                <div className="epall-block4-search-wrapper">
                    <h3 className="epall-block4-title">The search feature will be available soon!</h3>
                    {/* <h3 className="epall-block4-title">Search for the episode you want</h3> */}
                    {/* <form className="epall-block4-form" onSubmit={handleSubmit}>
                        <div className="epall-block4-searchbar">
                            <input 
                                className="epall-search-input" 
                                type="string" 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                required 
                            />
                            <FontAwesomeIcon icon={faMagnifyingGlass} className='epall-search-icon' size='xl' />
                        </div>
                        <button type="submit" className={`epall-block4-btn ${searchTerm === "" ? "hidden" : ""}`}>Search</button>
                    </form> */}
                </div>
            </div>
            <div className="epall-hr-wrapper">
                <hr className="epall-hr" />
            </div>
            <div className="epall-block5">
                <h3 className="epall-block5-title">All Episodes</h3>
                <div className="ep-podcasts-wrapper">
                    { podcasts.map(podcast => (
                        <div key={podcast.id} className="ep-podcast">
                            <p className="ep-podcast-epnum">#{podcast.episodeNum}</p>
                            <button className="ep-podcast-title"  onClick={() => navigatePodcast(podcast.epnum)}>
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
