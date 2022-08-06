import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_VERIFY_REQUEST,
  // USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_FRIEND_INVOKE_REQUEST,
  USER_FRIEND_INVOKE_SUCCESS,
  USER_FRIEND_INVOKE_FAIL,
  USER_FRIEND_CANCEL_SUCCESS,
  USER_FRIEND_CANCEL_FAIL,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  ACCEPT_FRIEND_REQUEST_FAILED,
} from "../constants/userConstants";

import { renderError } from "../utils/renderActionErrors";
import { USER_FRIEND_CANCEL_REQUEST } from "./../constants/userConstants";

const configForJson = {
  headers: {
    "Content-Type": "application/json",
  },
};

function setAuthHeader(token) {
  return {
    "Content-Type": "application/json",
    "Authorization": token,
  };
}

export const setLoginData = (data) => async (dispatch) => {
  dispatch({
    type: USER_LOGIN_SUCCESS,
    payload: data,
  });
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const { data } = await axios.post(
      "/api/user",
      { username, email, password },
      configForJson
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("QussAd4sw9", data);
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: renderError(error),
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      configForJson
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("QussAd4sw9", data);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: renderError(error),
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("QussAd4sw9");
  dispatch({ type: USER_LOGOUT });
};

export const verify = () => async (dispatch) => {
  try {
    dispatch({
      type: USER_VERIFY_REQUEST,
    });

    const userInfo = JSON.parse(localStorage.getItem("QussAd4sw9"));

    await axios.put(`/api/user/verify/${userInfo.email}`);
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAIL,
      payload: renderError(error),
    });
  }
};

export const listUser = (keyword, token) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    });

    const { data } = await axios.get(`/api/user/search?keyword=${keyword}`, {
      headers: setAuthHeader(token),
    });

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload: error,
    });
  }
};

export const sendFriendRequest =
  (sourceUserId, destinationUserId, token) => async (dispatch) => {
    try {
      dispatch({
        type: USER_FRIEND_INVOKE_REQUEST,
      });
      console.log(setAuthHeader(token), "token");
      const { data } = await axios.post(
        `/api/user/request?source=${sourceUserId}&destination=${destinationUserId}`,
        {},
        { headers: setAuthHeader(token) }
      );

      dispatch({
        type: USER_FRIEND_INVOKE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_FRIEND_INVOKE_FAIL,
        payload: error,
      });
    }
  };

export const cancelFriendRequest =
  (sourceUserId, destinationUserId, token) => async (dispatch) => {
    try {
      dispatch({
        type: USER_FRIEND_CANCEL_REQUEST,
      });

      const { data } = await axios.post(
        `/api/user/cancel?source=${sourceUserId}&destination=${destinationUserId}`,
        {},
        { headers: setAuthHeader(token) }
      );

      dispatch({
        type: USER_FRIEND_CANCEL_SUCCESS,
        payload: data,
      });
    } catch (ex) {
      dispatch({
        type: USER_FRIEND_CANCEL_FAIL,
        payload: ex,
      });
    }
  };

export const acceptFriendRequests =
  (sourceUserId, destinationUserId, token) => async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/user/accept?source=${sourceUserId}&destination=${destinationUserId}`,
        {},
        { headers: setAuthHeader(token) }
      );

      console.log(data, "accepted data");
      dispatch({
        type: ACCEPT_FRIEND_REQUEST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACCEPT_FRIEND_REQUEST_FAILED,
        payload: error,
      });
    }
  };

export const friendRequest = (data) => (dispatch) => {
  dispatch({
    type: "NEW_FRIEND_REQUEST",
    payload: data,
  });
};
