import axios from "axios";
import { loginStart, loginSuccess, loginFailure } from "./userSlice";

// LOGIN API CALLS

export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await axios.post(
      "http://localhost:5050/api/users/login",
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },

      { withCredentials: true }
    );

    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};
