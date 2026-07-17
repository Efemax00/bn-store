import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    const result = await login(email, password);

    if (result.success) {
      const redirectTo = location.state?.from || "/admin";
      navigate(redirectTo, { replace: true });
    } else {
      setError(result.message || "Login failed.");
      setPassword("");
    }
  }

  return (
    <>
      <Nav />

      <div className="admin-shell dark">
        <form className="admin-card" onSubmit={handleSubmit}>
          <div className="brand-block" style={{ marginBottom: 32 }}>
            <div className="brand-tag">Admin Access</div>
          </div>

          <label className="field-label" htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
            className="admin-input"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="field-label" htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            className="admin-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && (
            <p className="admin-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="admin-btn-primary"
          >
            Sign In
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
}