import React, { useRef, useState } from "react";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";
import "./signup.css";

export default function SigninPage() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const history = useHistory();
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to Sign in!");
    }
    setLoading(false);
  }

  return (
    <div className="bg">
      <div className="signin-container">
        <div className="form-content">
          <form className="form" onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>Sign In</h1>

            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className="form-inputs">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                ref={emailRef}
              />
            </div>
            <div className="form-inputs">
              <label className="form-label">Password</label>
              <input
                className="form-input"
                type="password"
                name="password"
                placeholder="Enter your password"
                ref={passwordRef}
              />
            </div>
            <button disabled={loading} className="form-input-btn" type="submit">
              Sign in
            </button>
            <span className="form-input-login">
              Don't have an account? Create one <Link to="/signup">here</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
