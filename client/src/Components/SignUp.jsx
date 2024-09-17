import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "./axiosInstance";
import { signup } from "./apiService";

const SignUp = () => {
  const emailRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [matchPwd, setMatchPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (pwd !== matchPwd) {
      setErrMsg("Passwords do not match");
      return;
    }

    try {
      const signUpRes = await signup(email, pwd);
      console.log(signUpRes?.data);
      console.log(signUpRes?.accessToken);
      console.log(JSON.stringify(signUpRes));
      localStorage.setItem("token", signUpRes.data.token);
      localStorage.setItem("refreshToken", signUpRes.data.refreshToken);

      setSuccess(true);
      setEmail("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Email already registered");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            <Link to="/">Log In</Link>
          </p>
        </section>
      ) : (
        <section>
          <p ref={errRef} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              ref={emailRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />

            <label htmlFor="confirm_pwd">Confirm Password:</label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
            />

            <button disabled={!email || !pwd || !matchPwd}>Sign Up</button>
          </form>
          <p>
            Already registered?
            <br />
            <span>
              <Link to="/">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default SignUp;
