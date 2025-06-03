import { useRoutes, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import AdminLogin from "../pages/admin/AdminLogin";
import AdminRegister from "../pages/admin/AdminRegister";
import EditFeatured from "../pages/admin/EditFeatured";
import EditGuest from "../pages/admin/EditGuest";
import EditPodcast from "../pages/admin/EditPodcast";
import ForgotPassword from "../pages/admin/ForgotPassword";
import UploadGuest from "../pages/admin/UploadGuest";
import UploadPodcast from "../pages/admin/UploadPodcast";

import AboutNaomi from "../pages/AboutNaomi";
import Community from "../pages/Community";
import EpisodesAll from "../pages/EpisodesAll";
import EpisodesClimateJustice from "../pages/EpisodesClimateJustice";
import EpisodesMentalHealth from "../pages/EpisodesMentalHealth";
import EpisodesNaomisFavs from "../pages/EpisodesNaomisFavs";
import EpisodesPersonalGrowth from "../pages/EpisodesPersonalGrowth";
import EpisodesSocialJustice from "../pages/EpisodesSocialJustice";
import GetInvolved from "../pages/GetInvolved";
import Guests from "../pages/Guests";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import OurValues from "../pages/OurValues";
import PodcastDetails from "../pages/PodcastDetails";


// all site routes. Protected routes start with an uppercase letter, and public routes with a lowercase
export default function Router (){
    return useRoutes([
        {
            path: '/',
            children: [
                { path: '/', element: <LandingPage /> },

                { path: '/AdminLogin', element: <AdminLogin /> },
                { path: '/AdminRegister', element: (<ProtectedRoute><AdminRegister /></ProtectedRoute>) },
                { path: '/EditFeatured', element: (<ProtectedRoute><EditFeatured /></ProtectedRoute>) },
                { path: '/EditGuest', element: (<ProtectedRoute><EditGuest /></ProtectedRoute>) },
                { path: '/EditPodcast', element: (<ProtectedRoute><EditPodcast /></ProtectedRoute>) },
                { path: '/ForgotPassword', element: (<ForgotPassword />) },
                { path: '/UploadGuest', element: (<ProtectedRoute><UploadGuest /></ProtectedRoute>) },
                { path: '/UploadPodcast', element: (<ProtectedRoute><UploadPodcast /></ProtectedRoute>) },

                { path: '/aboutNaomi', element: <AboutNaomi /> },
                { path: '/community', element: <Community /> },
                { path: '/episodes/all', element: <EpisodesAll /> },
                { path: '/episodes/climateJustice', element: <EpisodesClimateJustice /> },
                { path: '/episodes/mentalHealth', element: <EpisodesMentalHealth /> },
                { path: '/episodes/naomisFavs', element: <EpisodesNaomisFavs /> },
                { path: '/episodes/personalGrowth', element: <EpisodesPersonalGrowth /> },
                { path: '/episodes/socialJustice', element: <EpisodesSocialJustice /> },
                { path: '/getInvolved', element: <GetInvolved /> },
                { path: '/guests', element: <Guests /> },
                { path: '/ourValues', element: <OurValues /> },
                { path: '/podcast/:pid', element: <PodcastDetails /> },
                
                { path: '/404', element: <NotFoundPage /> },
                { path: '*', element: <Navigate to="/404" replace /> }, // Redirect to 404
            ]
        },
    ]);
}
