import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { LinkedInApi } from "../config";
import axios from "axios";
import { login } from "./apiService";
import { useDispatch, useSelector } from "react-redux";
import { handleUser } from "../States/features/user/userSlice";

function SignIn() {
  const [code, setCode] = useState(null);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [resonse, setResponse] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Fetched locally: ", localStorage.getItem("token"));
    if (token) {
      axios
        .post("http://localhost:5000/verify-token", { token })
        .then((response) => {
          if (response.data.valid) {
            setIsAuthenticated(true);
            dispatch(handleUser());
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
      dispatch(handleUser());
    } catch (error) {
      // console.error("Error logging in: ", error);
      setResponse("Login failed");
    }
  };

  const LinkedinLogin = () => {
    const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}&state=${state}&scope=${scope}`;
    window.location.href = authUrl;
  };

  if (user) {
    return <Navigate to="/home" replace="true" />;
  } else {
    return (
      <>
        <div className="loginPage flex h-screen justify-center ">
          <div className="companyLogo w-1/2 h-full bg-gradient-to-r from-cyan-500 to-blue-500 blur-sm grid place-items-center">
            <h1 className="text-5xl">Logo</h1>
          </div>
          <div className="loginOptions w-1/2 flex flex-col justify-center items-center justify-items-center space-y-3">
            <div className="lockIcon size-fit rounded-full p-2 bg-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-6 text-white"
              >
                <path
                  fillRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="loginForm flex flex-col items-center space-y-3">
              <div className="header">Sign in</div>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center space-y-3"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border p-2 rounded"
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={pwd}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  className="border p-2 rounded"
                />
                <button
                  type="submit"
                  className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                >
                  Continue
                </button>
                <Link to="/signup">Need an account?</Link>
              </form>
              <div className="flex w-full items-center justify-center my-4">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="px-4 text-gray-500">Or</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <button
                type="button"
                className="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
                onClick={LinkedinLogin}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                  className="w-4 h-4 me-2"
                >
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
                Continue with LinkedIn
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignIn;
