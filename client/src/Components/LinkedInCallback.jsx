import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { LinkedInApi } from "../config";
import { useDispatch } from "react-redux";
import { handleUser } from "../States/features/user/userSlice";

const LinkedInCallback = () => {
  const location = useLocation();
  const { clientId, redirectUrl, oauthUrl, scope, state } = LinkedInApi;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get("code");
      const state = params.get("state");

      // if (code && state) {
      //   try {
      //     const response = await axios.post(
      //       "https://www.linkedin.com/oauth/v2/accessToken",
      //       null,
      //       {
      //         params: {
      //           grant_type: "authorization_code",
      //           code,
      //           redirect_uri: "http://localhost:5173/home",
      //           client_id: clientId,
      //           client_secret: "9jbQvqg1Gmyun0O5",
      //         },
      //         headers: {
      //           "Content-Type": "application/x-www/form-urlencoded",
      //         },
      //       }
      //     );
      //     const { access_token } = response.data;
      //     console.log("Access_token:", access_token);
      //   } catch (error) {
      //     console.error("Error fetching access token:", error);
      //   }
      // }

      if (code && state) {
        try {
          const response = await axios.get("http://localhost:5000/auth", {
            params: { code },
          });

          const { token, refreshToken } = response.data;
          console.log("Token", token);
          console.log("Refresh Token", refreshToken);
        } catch (error) {
          console.error("Error fetching tokens:", error);
        }
      }
    };
    fetchToken();
  }, [location]);

  return <div>Loading...</div>;
};

export default LinkedInCallback;
