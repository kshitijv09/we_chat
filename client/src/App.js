import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./components/Landing/Landing";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Chatbox from "./pages/Chatbox/Chatbox";
import Dashboard from "./pages/Dashboard/Dashboard";
import Avatar from "./components/Avatar";
function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/messages", element: <Chatbox /> },
    { path: "/avatar", element: <Avatar /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
