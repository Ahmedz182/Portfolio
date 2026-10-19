import { createSlice } from "@reduxjs/toolkit";

const initialTheme = () => {
  try {
    if (localStorage.theme === "dark" || localStorage.theme === "light") {
      return localStorage.theme;
    }
  } catch (e) {
    // Storage blocked: fall through to the system preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const rootSlice = createSlice({
  name: "root",
  initialState: {
    loading: false,
    portfolioData: null,
    userData: null,
    reload: false,
    errorAlert: false,
    theme: initialTheme(),
  },
  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    ReloadTrue: (state) => {
      state.reload = true;
    },
    ReloadFalse: (state) => {
      state.reload = false;
    },

    ErrorTrue: (state) => {
      state.errorAlert = true;
    },
    ErrorFalse: (state) => {
      state.errorAlert = false;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    },
  },
});

export default rootSlice.reducer;
export const {
  setPortfolioData,
  hideLoading,
  showLoading,
  ReloadTrue,
  ReloadFalse,
  ErrorTrue,
  ErrorFalse,
  setUserData,
  toggleTheme,
} = rootSlice.actions;
