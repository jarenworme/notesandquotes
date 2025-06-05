import { useNavigate, useParams } from "react-router-dom";
import '../styles/not-found-page.css';


export default function PodcastDetails() {
    // init navigate variable for page navigation
    const navigate = useNavigate();

    // routing functions
    const navigateLandingPage = () => navigate('/', { replace: false });

    // input parameters for determining if to load register or login on mount (1 for register, 2 for login)
    const { pid } = useParams();

    // set isRegistered based on input parameters
    useEffect(() => {
        if(pid.length() > 0){
            setIsRegistering(true);
        }
    }, [pid]);

    return (
        <div className="p404-wrapper">
            <p className="p404-text">Podcast Details</p>
            <button className="p404-button" onClick={navigateLandingPage}>Return to Notes & Quotes</button>
        </div>
    );
}
