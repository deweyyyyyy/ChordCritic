import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm";
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  function handleLogin(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <Routes>
      <Route path="/" element={<Home user={user} onLogout={handleLogout} />} />
      <Route path="/signup" element={<AuthForm key="register" mode="register" onLogin={handleLogin} />} />
      <Route path="/login" element={<AuthForm key="login" mode="login" onLogin={handleLogin} />} />
    </Routes>
  );
}