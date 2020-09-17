import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_ERROR,
  LOAD_USER,
  LOGOUT,
  CLEAR_PROFILE,
  CLEAR_PSOTS,
} from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    console.log("No Token");
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email: email, password: password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN_USER,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    console.log(error);

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (username, email, password, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ username, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER_USER,
      payload: res.data,
    });

    dispatch(loadUser());
    history.push("/createProfile");
  } catch (error) {
    console.log(error);

    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = (history) => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: CLEAR_PSOTS,
  });
  history.push("/login");
};
