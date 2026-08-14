import { useMemo, useState, FormEvent ,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {useAppDispatch,useAppSelector,} from "../app/hooks";
import { loginUser } from "../features/user/userSlice";
import "../styles/Login.css";


function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(state=>state.user.user)

  const { loading, error } = useAppSelector(
    (state) => state.user
  );

  useEffect(() => {

    if (user) {
        navigate("/dashboard");
    }

  }, [user, navigate]);

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
      })),
    []
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const result = await dispatch(
      loginUser({
        email,
        password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };


  return (
    <div className="aura-wrap">

      <div className="blob blob--1"></div>
      <div className="blob blob--2"></div>
      <div className="blob blob--3"></div>
      <div className="blob blob--4"></div>

      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
          }}
        ></div>
      ))}


      <div className="card">

        <div className="icon-badge">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            />
          </svg>
        </div>


        <h1>Welcome back</h1>

        <p className="subtitle">
          Sign in to continue to your conversations.
        </p>


        <form onSubmit={handleSubmit}>

          <div className="field">

            <div className="field-label-row">
              <label htmlFor="email">Email</label>
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
                id="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

            </div>
          </div>


          <div className="field">

            <div className="field-label-row">

              <label htmlFor="password">
                Password
              </label>

              <a href="#" className="forgot-link">
                Forgot password?
              </a>

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
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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


          <div className="keep-signed-in">

            <input
              type="checkbox"
              id="keepSignedIn"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
            />

            <label htmlFor="keepSignedIn">
              Keep me signed in
            </label>

          </div>


          {error && (
            <p>
              {error}
            </p>
          )}


          <button
            className="btn-continue"
            type="submit"
            disabled={loading}
          >

            {loading ? "Signing in..." : "Continue"}

            {!loading && (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}

          </button>

        </form>


        <p className="footer-text">
          New to Nexa? <a href="#">Create an account</a>
        </p>

      </div>
    </div>
  );
}


export default Login;

