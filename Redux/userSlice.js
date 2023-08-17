import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  userInfo: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return {
        userInfo: action.payload,
      };
    },
  },
});

export const { loginSuccess } = userSlice.actions;
export default userSlice.reducer;
