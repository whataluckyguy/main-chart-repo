import axiosInstance from "./axiosInstance";

export const signup = (email, pwd) => {
  return axiosInstance.post("/signup", { email, pwd });
};

export const login = (email, pwd) => {
  return axiosInstance.post("/login", { email, pwd });
};
