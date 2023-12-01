import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: "f3559f88-e228-4848-b021-c14244277273",
  customerId: "Nameless",
  baseUrl: "http://localhost:9000/",
  pathName: "login",
  authToken: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setBaseUrl: (state, action) => {
      localStorage.setItem("baseUrl", action.payload);
      console.log("state.baseUrl", state.baseUrl);
      return {
        ...state,
        baseUrl: action.payload,
      };
    },
    setCustomerId: (state, action) => {
      state.customerId = action.payload;
    },
    setPathName: (state, action) => {
      state.pathName = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setAuthToken: (state, action) => {
      console.log("setAuthToken", action.payload);
      state.authToken = action.payload;
    }
  },
});

export const { setMode, setCustomerId, setPathName, setBaseUrl, setUserId, setAuthToken } = globalSlice.actions;

export default globalSlice.reducer;
