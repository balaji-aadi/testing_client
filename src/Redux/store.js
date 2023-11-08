import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/authSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
