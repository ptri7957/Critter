import {
  CREATE_PROFILE,
  CREATE_PROFILE_ERROR,
  GET_USER_PROFILE,
  GET_USER_PROFILE_ERROR,
  GET_PROFILE_BY_ID,
  GET_ALL_PROFILES,
  CLEAR_PROFILE,
} from "./types";
import axios from "axios";
import { getUserPosts } from "./post";

export const createProfile = (
  bio,
  youtube,
  facebook,
  twitter,
  instagram,
  history
) => async (dispatch) => {
  const profileData = {
    bio: bio,
    youtube: youtube,
    facebook: facebook,
    twitter: twitter,
    instagram: instagram,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(profileData);

  try {
    const res = await axios.post("/api/profile", body, config);

    dispatch({
      type: CLEAR_PROFILE,
    });

    dispatch({
      type: CREATE_PROFILE,
      payload: res.data,
    });

    history.push("/dashboard");
  } catch (error) {
    dispatch({
      type: CREATE_PROFILE_ERROR,
    });
  }
};

export const getUserProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");
    dispatch({
      type: GET_USER_PROFILE,
      payload: res.data,
    });
    dispatch(getUserPosts());
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_ERROR,
    });
  }
};

export const getUserById = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/profiles/${id}`);
    dispatch({
      type: GET_PROFILE_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_ERROR,
    });
  }
};

export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: GET_ALL_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_PROFILE_ERROR,
    });
  }
};
