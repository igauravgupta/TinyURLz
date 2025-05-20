// Fix: Export a routes array, not a router instance
import App from "../App";
import HomePage from "../pages/HomePage";
import AuthPage from "../features/auth/pages/AuthPage";
import DashboardPage from "../features/short_url/pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";

export const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "auth", element: <AuthPage /> },
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];
