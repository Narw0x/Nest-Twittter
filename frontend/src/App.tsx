import {createBrowserRouter, RouterProvider} from "react-router-dom";

import Root from "./pages/Root";
import HomePage from "./pages/Home";
import AboutPage  from "./pages/About";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import ProfilePage from "./pages/profile/Profile";
import {checkAuthToken} from "./utils/auth";
import ViewTwits from "./pages/twits/ViewTwits";
import CreateTwit from "./pages/twits/CreateTwit";
import UpdateTwit from "./pages/twits/UpdateTwit";

const router = createBrowserRouter([
    {
        path: "/",
        id: "root",
        element: <Root />,
        errorElement: <div>Oops! There was an error.</div>,
        children: [
            {index: true, element: <HomePage />},
            {path: "about", element: <AboutPage />},
            {
                path:"auth",
                children: [
                    {path: "login", element: <LoginPage />},
                    {path: "register",element: <RegisterPage />},
                ],
            },
            {
                path: "twits",
                loader:checkAuthToken,
                children: [
                    {index: true, element: <ViewTwits/>},
                    {path: "create", element: <CreateTwit />},
                    {path: "update/:id", element: <UpdateTwit />},
                ],
            },
            {
                path: "profile",
                loader: checkAuthToken,
                children: [
                    {path: ':id', element: <ProfilePage />},
                ],
            }
        ],
    }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
