import { useState, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { RegisterService } from "../services/common/loginservice";
import { saveAuth } from "../services/common/authStorage";
import { jwtDecode } from "jwt-decode";
import { UserFeature } from "../features/user/userFeatures";
import "../styles/Login.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

const STATIC_STARS = [
  { top: "12%", left: "18%", delay: "0.2s" },
  { top: "28%", left: "82%", delay: "1.4s" },
  { top: "45%", left: "12%", delay: "2.1s" },
  { top: "72%", left: "75%", delay: "0.8s" },
  { top: "85%", left: "25%", delay: "3.2s" },
  { top: "15%", left: "62%", delay: "2.5s" },
  { top: "60%", left: "45%", delay: "1.1s" },
  { top: "35%", left: "38%", delay: "0.5s" },
  { top: "90%", left: "88%", delay: "2.8s" },
  { top: "8%", left: "90%", delay: "1.9s" },
  { top: "78%", left: "10%", delay: "3.5s" },
  { top: "52%", left: "92%", delay: "0.9s" },
  { top: "22%", left: "48%", delay: "2.2s" },
  { top: "65%", left: "60%", delay: "1.7s" },
];

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await RegisterService({ username, email, password });
      if (data.token) {
        const decoded = jwtDecode<UserFeature.JwtPayload>(data.token);
        const user: UserFeature.User = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
        };
        saveAuth(user, data.token, data.refreshToken);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="aura-wrap">
      <div className="blob blob--1" />
      <div className="blob blob--2" />
      <div className="blob blob--3" />
      <div className="blob blob--4" />

      {STATIC_STARS.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        />
      ))}

      <div className="card animate-fade-in">
        <div className="icon-badge">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <line x1="19" y1="8" x2="19" y2="14" />
            <line x1="22" y1="11" x2="16" y2="11" />
          </svg>
        </div>

        <h1>Create Account</h1>
        <p className="subtitle">Join Nexa and chat seamlessly in real time.</p>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <div className="field-label-row">
              <label htmlFor="reg-username">Username</label>
            </div>
            <div className="input-wrap">
              <svg
                className="leading-icon"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <input
                type="text"
                id="reg-username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                minLength={3}
              />
            </div>
          </div>

          <div className="field">
            <div className="field-label-row">
              <label htmlFor="reg-email">Email</label>
            </div>
            <div className="input-wrap">
              <svg
                className="leading-icon"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <input
                type="email"
                id="reg-email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="field">
            <div className="field-label-row">
              <label htmlFor="reg-password">Password</label>
            </div>
            <div className="input-wrap">
              <svg
                className="leading-icon"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="7.5" cy="15.5" r="5.5" />
                <path d="m21 2-9.6 9.6" />
                <path d="m15.5 7.5 3 3L22 7l-3-3" />
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                id="reg-password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
              <button
                type="button"
                className="toggle-visibility"
                aria-label="Show password"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          {error && <div className="modal-error-badge">{error}</div>}

          <button className="btn-continue" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="footer-text">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;