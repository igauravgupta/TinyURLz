import { createBrowserRouter } from "react-router";
import App from "../App";
import HomePage from "../pages/HomePage";
import AuthPage from "../features/auth/pages/AuthPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element:<App />,
    children: [
      { path: "", element: <HomePage /> },
      {path: "auth", element: <AuthPage />},
    ],
  },
  {
    path: "*",
    element:<NotFoundPage/>,
  }
]);
