import { useRoutes, Navigate } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "../pages/AdminLogin";
import AdminRegister from "../pages/AdminRegister";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";
import PodcastDetails from "../pages/PodcastDetails";
import UploadGuest from "../pages/UploadGuest";
import UploadPodcast from "../pages/UploadPodcast";


export default function Router (){
    return useRoutes([
        {
            path: '/',
            children: [
                { path: '/', element: <LandingPage /> },
                { path: '/adminLogin', element: <AdminLogin /> },
                { path: '/adminRegister', element: (<ProtectedRoute><AdminRegister /></ProtectedRoute>) },
                { path: '/podcast/:pid', element: <PodcastDetails /> },
                { path: '/uploadGuest', element: (<ProtectedRoute><UploadGuest /></ProtectedRoute>) },
                { path: '/uploadPodcast', element: (<ProtectedRoute><UploadPodcast /></ProtectedRoute>) },
                // { path: '/changePassword', element: (<ProtectedRoute><ChangePassword /></ProtectedRoute>) },
                { path: '/404', element: <NotFoundPage /> },
                { path: '*', element: <Navigate to="/404" replace /> }, // Redirect to 404
            ]
        },
    ]);
}
