import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Layout from "./components/Layout/Layout";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import UserContextProvider from "./Context/UserContext/UserContext";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "home", element: <ProtectRoute><Home /></ProtectRoute>},
    ],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider><RouterProvider router={router}></RouterProvider></UserContextProvider>
    </>
  );
}

export default App;
