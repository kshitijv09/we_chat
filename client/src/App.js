import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Landing from "./components/Landing/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Chatbox from "./pages/Chatbox/Chatbox";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/messages", element: <Chatbox /> },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
