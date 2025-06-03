import React from 'react';
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { About } from "./pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        id: "root",
        element: <Root />,
        errorElement: <div>Oops! There was an error.</div>,
        children: [
            {index: true, element: <Home />},
            {path: "about", element: <About />},
        ],
    }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
