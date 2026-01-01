import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Login from "../auth/Login.jsx";
import Signup from "../auth/Signup.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  }
    
]);

export default router;
