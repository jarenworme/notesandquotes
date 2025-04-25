import { useRoutes, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminRegister from "../pages/AdminRegister";
import EditFeatured from "../pages/EditFeatured";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import PodcastDetails from "../pages/PodcastDetails";
import EpisodesAll from "../pages/EpisodesAll";
import UploadGuest from "../pages/UploadGuest";
import UploadPodcast from "../pages/UploadPodcast";


// all site routes. Protected routes start with a lowercase letter, and public routes with an uppercase
export default function Router (){
    return useRoutes([
        {
            path: '/',
            children: [
                { path: '/', element: <LandingPage /> },
                { path: '/AdminLogin', element: <AdminLogin /> },
                { path: '/adminRegister', element: (<ProtectedRoute><AdminRegister /></ProtectedRoute>) },
                { path: '/editFeatured', element: (<ProtectedRoute><EditFeatured /></ProtectedRoute>) },
                { path: '/Podcast/:pid', element: <PodcastDetails /> },
                { path: '/Episodes/All', element: <EpisodesAll /> },
                { path: '/uploadGuest', element: (<ProtectedRoute><UploadGuest /></ProtectedRoute>) },
                { path: '/uploadPodcast', element: (<ProtectedRoute><UploadPodcast /></ProtectedRoute>) },
                // { path: '/changePassword', element: (<ProtectedRoute><ChangePassword /></ProtectedRoute>) },
                { path: '/404', element: <NotFoundPage /> },
                { path: '*', element: <Navigate to="/404" replace /> }, // Redirect to 404
            ]
        },
    ]);
}
