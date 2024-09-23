import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleUser } from "./States/features/user/userSlice";

const LinkedInRedirect = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const fetchAccessToken = async (code) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api?code=${code}`
      );
      const user = response.data;
      dispatch(handleUser());
    } catch (error) {
      console.error("Error fetching access token: ", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const state = params.get("state");

    if (code) {
      fetchAccessToken(code);
    }
  }, [location]);

  return <div>Redirecting...</div>;
};

export default LinkedInRedirect;
