import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api";

export default function AuthForm({ mode, onLogin }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();

  // what the user types
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser from reloading the page
    setError("");

    const url = API + (isRegister ? "/api/auth/register" : "/api/auth/login");
    const body = isRegister ? { username, email, password } : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      onLogin(data); // app saves the token and user
      navigate("/"); // go to the homepage
    } catch {
      setError("Could not reach the server. Is it running?");
    }
  }

  return (
    <div>
      <h1>{isRegister ? "Create account" : "Log in"}</h1>

      <form onSubmit={handleSubmit} className="form">
        {isRegister && (
          <label>
            Username
            <input value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
        )}

        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={isRegister ? 8 : undefined}
            required
          />
        </label>

        {isRegister && <p className="hint">Password must be at least 8 characters.</p>}
        {error && <p className="error">{error}</p>}

        <button type="submit">{isRegister ? "Create account" : "Log in"}</button>
      </form>
    </div>
  );
}
