import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./AppLayout";
import Instructions from "./pages/Instructions";
import Categories from "./pages/Categories";
import Play from "./pages/Play";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/instructions",
        element: <Instructions />,
      },
      {
        path: "/categories",
        element: <Categories />,
      },
      {
        path: "/play",
        element: <Play />,
      },
    ],
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
