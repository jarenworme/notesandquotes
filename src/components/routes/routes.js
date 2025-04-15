import { useRoutes, Navigate } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function Router (){
    return useRoutes([
        {
            path: '/',
            children: [
                { path: '/', element: <LandingPage /> },

                // { path: '/changePassword', element: (<ProtectedRoute><ChangePassword /></ProtectedRoute>) },

                { path: '/404', element: <NotFoundPage /> },
                { path: '*', element: <Navigate to="/404" replace /> }, // Redirect to 404
            ]
        },
    ]);
}
