import { createBrowserRouter } from "react-router-dom";
import Root from "./Root.tsx";
import HomePage from "./Home.tsx";
import AboutPage from "./About.tsx";
import LoginPage from "./auth/Login.tsx";
import RegisterPage from "./auth/Register.tsx";
import ProfilePage from "./profile/Profile.tsx";
import { checkAuthToken } from "../utils/auth.ts";
import ViewTwits from "./twits/ViewTwits.tsx";
import CreateTwit from "./twits/CreateTwit.tsx";
import UpdateTwit from "./twits/UpdateTwit.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        id: "root",
        element: <Root />,
        errorElement: <div>Oops! There was an error.</div>,
        children: [
            { index: true, element: <HomePage /> },
            { path: "about", element: <AboutPage /> },
            {
                path: "auth",
                children: [
                    { path: "login", element: <LoginPage /> },
                    { path: "register", element: <RegisterPage /> },
                ],
            },
            {
                path: "twits",
                loader: checkAuthToken,
                children: [
                    { index: true, element: <ViewTwits /> },
                    { path: "create", element: <CreateTwit /> },
                    { path: "update/:twitId", element: <UpdateTwit /> },
                ],
            },
            {
                path: "profile",
                loader: checkAuthToken,
                children: [
                    { path: ":userId", element: <ProfilePage /> },
                ],
            },
        ],
    },
]);

export default router;