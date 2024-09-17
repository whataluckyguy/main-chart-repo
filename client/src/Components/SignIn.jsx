import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { LinkedInApi } from "../config";
import axios from "axios";
import { login } from "./apiService";

function SignIn() {
  const [code, setCode] = useState(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [resonse, setResponse] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Fetched locally: ", localStorage.getItem("token"));
    if (token) {
      axios
        .post("http://localhost:5000/verify-token", { token })
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true);
            console.log("Success");
          } else {
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          console.error("Token verification failed: ", error);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(email, pwd);
      setResponse(res.data);
      // localStorage.setItem("token", resonse.token);
      console.log(res.data.token);
      console.log(res.data.refreshToken);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("refreshToken", res.data.refreshToken);
    } catch (error) {
      // console.error("Error logging in: ", error);
      setResponse("Login failed");
    }
  };

  const popUp = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const authUrl = `${oauthUrl}&client_id=${clientId}&scope=${scope}&state=${state}&redirect_uri=${redirectUrl}`;

    const width = 450,
      height = 730,
      left = window.screen.width / 2 - width / 2,
      top = window.screen.height / 2 - height / 2;
    window.open(
      authUrl,
      "Linkedin",
      "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  };

  const getUserCredentials = (code) => {
    axios
      .get(
        // "http://127.0.0.1:5000/api"
        `http://localhost:5000/api?code=${code}`
        // `${NodeServer.baseURL} + ${NodeServer.getUserCredentials}?code=${code}`
      )
      .then((res) => {
        const user = res.data;
        console.log("response: ", res.data);

        context.setUser(res.data);

        // this.setState({
        //   user,
        //   loaded: true,
        // });
        // Do something with user
      });
  };

  const handleCode = (passedCode) => {
    if (passedCode.data.type === "code") {
      setCode(passedCode.data.code);
      getUserCredentials(passedCode.data.code);
    }
    // alert(code);
  };

  useEffect(() => {
    if (window.opener && window.opener !== window) {
      const PopupUrl = new URL(window.location.href);
      const fetchedCode = PopupUrl.searchParams.get("code");
      window.opener.postMessage({ type: "code", code: fetchedCode }, "*");
      window.close();
    }
    window.addEventListener("message", handleCode);
  }, []);

  return (
    <div>
      <h2>Login with LinkedIn</h2>
      <button onClick={popUp}>Continue with LinkedIn</button>
      <div>{code}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <button type="submit">Login with password</button>
      </form>
      <p>
        Need Account?
        <br />
        <span>
          <Link to="/signup">Sign Up</Link>
        </span>
      </p>
    </div>
  );
}

export default SignIn;
