import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./components/Register";
import TaskList from "./components/TaskList";
import Layout from "./components/layout";
import { AuthProvider } from "./hooks/AuthProvider";

function App() {
  const [username, setUsername] = useState("");

  const handleLoginSuccess = (user) => {
    setUsername(user.username);
  };

  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<Layout><TaskList /></Layout>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
