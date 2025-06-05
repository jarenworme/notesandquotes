import { useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useFetchPodcasts } from "../../hooks/useFetchPodcasts";
import { useDeletePodcast } from "../../hooks/useDeletePodcast";
import '../styles/episodes.css';
import '../styles/loading.css';


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
    } = useFetchPodcasts('isPersonalGrowth');

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

    // routing functions
    const navigateLandingPage = () => {
        fetchPodcasts();
    };

    const loadmore = () => {
        loadMorePodcasts();
    }

    const logg = () => {
        console.log(podcasts);
        console.log(morePodcastsAvailable);
    }

    if (loadingFetch || loadingDelete) return (
        <div className="loading-wrapper">
            <div className="loading-screen">
                <div className="loading-img-wrapper">
                    <div className="loading-img l1" />
                </div>
                <div className="loading-img-wrapper">
                    <div className="loading-img l2" />
                </div>
                <div className="loading-img-wrapper">
                    <div className="loading-img l3" />
                </div>
                <div className="loading-img-wrapper">
                    <div className="loading-img l4" />
                </div>
            </div>
        </div>
    );

    return (
        <div className="ep-wrapper">
            <button className="p404-button" onClick={navigateLandingPage}>Return to Notes & Quotes</button>
            <button className="p404-button" onClick={loadmore}>load more</button>
            <button className="p404-button" onClick={logg}>logg</button>
            <div className="podcasts-episodes-wrapper">
                { podcasts.map(podcast => (
                    <div key={podcast.id} className="podcasts-podcast">
                        <h4>{podcast.title}</h4>
                        { authData.isAuth && <button onClick={() => handleDelete(podcast.id)}>delete episode</button>}
                    </div>
                ))}
            </div>
        </div>
    );
}
