import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: false,
  },
  reducers: {
    handleUser: (state) => {
      state.value = true;
    },
  },
});

export const { handleUser } = userSlice.actions;

export default userSlice.reducer;
