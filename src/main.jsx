import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import App from "./App.jsx";
import Ticket from './components/Ticket.jsx'
import IA from "./pages/IA.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import ProtectedRoute from "./ProtectedRoute";
import { AuthProvider } from "./AuthContext";

import "./assets/css/styles.css";
import "./assets/css/home.css";
import "./assets/css/login.css";
import "./assets/css/ticket.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <IA /> },
    ],
  },
  {
    path: "home",
    element: (
      <>
        <Ticket />
        <Home />
      </>
    ),
  },
  { path: "login", element: <Login /> },
  { path: "signup", element: <Register /> },
  { path: "reset-password", element: <ResetPassword /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> 
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  </StrictMode>
);