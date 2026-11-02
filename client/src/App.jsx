import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AuthForm from "./pages/AuthForm";
import Search from "./pages/Search";
import ItemPage from "./pages/ItemPage";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch {
      return null;
    }
  });

  // called by the login/register form
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
    <BrowserRouter>
      <nav>
        <Link to="/" className="brand">ChordCritic</Link>
        <Link to="/search">Search</Link>

        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<h1>Welcome to ChordCritic</h1>} />
          <Route path="/search" element={<Search />} />
          <Route path="/item/:type/:id" element={<ItemPage />} />
          <Route path="/login" element={<AuthForm key="login" mode="login" onLogin={handleLogin} />} />
          <Route path="/register" element={<AuthForm key="register" mode="register" onLogin={handleLogin} />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
