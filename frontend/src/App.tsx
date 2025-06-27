import { RouterProvider} from "react-router-dom";
import router from "./pages/Routing.tsx";

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
