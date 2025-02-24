import { ToastContainer } from "react-toastify";
import "./App.css";
import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import Experts from "./pages/expert/Experts";
import Students from "./pages/student/Students";
import Chatpage from "./pages/chat/Chatpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserDashboard from "./pages/dashboard/UserDashboard";

function App() {
  const [updateLogin, setupdateLogin] = useState(1);

  const Navigation = [
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login setupdateLogin={setupdateLogin} /> },
    { path: "/sign-up", element: <Signup /> },
    { path: "/user-dashboard", element: <UserDashboard /> },
    { path: "/experts", element: <Experts /> },
    { path: "/students", element: <Students /> },
    { path: "/chat/:index", element: <Chatpage /> },
  ];

  return (
    <>
      <BrowserRouter>
        <Header setupdateLogin={setupdateLogin} updateLogin={updateLogin} />
        <Routes>
          {Navigation.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
