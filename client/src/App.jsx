import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthForm from "./pages/AuthForm"; // adjust to where yours lives
import Home from "./pages/Home";

export default function App() {
  const [user, setUser] = useState(null);
  function handleLogin(data) {
    localStorage.setItem("token", data.token); // fields depend on your backend
    setUser(data.user);
  }

  return (
    <Routes>
      <Route path="/" element={<Home user={user} />} />
      <Route path="/signup" element={<AuthForm key="register" mode="register" onLogin={handleLogin} />} />
      <Route path="/login" element={<AuthForm key="login" mode="login" onLogin={handleLogin} />} />
    </Routes>
  );
}