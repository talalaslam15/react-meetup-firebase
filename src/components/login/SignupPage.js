import React, { useRef, useState } from "react";
import "./signup.css";
import { useAuth } from "./AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function SignupPage() {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const password2Ref = useRef();
  const history = useHistory();
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [password2Error, setPassword2Error] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  function validateForm() {
    let e = true;
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setPassword2Error("");
    if (!usernameRef.current.value) {
      setNameError("UserName Required");
      e = false;
    }
    if (!emailRef.current.value) {
      setEmailError("Email Required");
      e = false;
    } else if (!emailRef.current.value.includes("@")) {
      setEmailError("Please Provide a valid Email");
      e = false;
    }
    if (!password2Ref.current.value) {
      setPassword2Error("Password Required");
      e = false;
    }
    if (!passwordRef.current.value) {
      setPasswordError("Password Required");
      e = false;
    } else if (passwordRef.current.value.length < 6) {
      setPasswordError("Password should contain atleast 6 letters!");
      e = false;
    } else if (passwordRef.current.value !== password2Ref.current.value) {
      setPasswordError("Passwords do not match!");
      setPassword2Error("Passwords do not match!");
      e = false;
    }
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      alert("Account created, Press Ok to Redirect to Home Page!");
      history.push("/");
    } catch {
      alert("Failed to create an Account");
    }
    setLoading(false);
  }

  return (
    <div className="bg">
      <div className="signup-container">
        <div className="form-content">
          <form className="form" onSubmit={handleSubmit} noValidate>
            <h1 style={{ textAlign: "center" }}>Sign Up</h1>
            <div className="form-inputs">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                type="text"
                name="username"
                placeholder="Enter your username"
                ref={usernameRef}
              />
              {nameError && <small style={{ color: "red" }}>{nameError}</small>}
            </div>
            <div className="form-inputs">
              <label className="form-label">Email</label>
              <input
                className="form-input"
                type="email"
                name="email"
                placeholder="Enter your email"
                ref={emailRef}
              />
              {emailError && (
                <small style={{ color: "red" }}>{emailError}</small>
              )}
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
              {passwordError && (
                <small style={{ color: "red" }}>{passwordError}</small>
              )}
            </div>
            <div className="form-inputs">
              <label className="form-label">Confirm Password</label>
              <input
                className="form-input"
                type="password"
                name="password2"
                placeholder="Confirm your password"
                ref={password2Ref}
              />
              {password2Error && (
                <small style={{ color: "red" }}>{password2Error}</small>
              )}
            </div>
            <button disabled={loading} className="form-input-btn" type="submit">
              Sign up
            </button>
            <span className="form-input-login">
              Already have an account? Login <Link to="/signin">here</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
}
