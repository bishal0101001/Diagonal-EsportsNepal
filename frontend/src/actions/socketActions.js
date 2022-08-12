import {
  FRIEND_ADD_SUCCESS,
  REMOVE_FRIEND_SUCCESS,
} from "./../constants/userConstants";
import {
  USER_CONNECTED,
  FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
  // DECLINE_FRIEND_REQUEST,
} from "../constants/socketConstants";

let friendRequests = [];
let friends = [];

export const socketAction = (socketConnection) => async (dispatch) => {
  dispatch({
    type: USER_CONNECTED,
    payload: socketConnection,
  });
};

export const setNotificationAction = (data) => (dispatch) => {
  dispatch({
    type: FRIEND_REQUEST,
    payload: data,
  });
};

export const cancelFriendRequestAction = (data) => (dispatch) => {
  dispatch({
    type: CANCEL_FRIEND_REQUEST,
    payload: { details: { ...data } },
  });
};

export const acceptFriendRequestAction = (data) => (dispatch) => {
  dispatch({
    type: FRIEND_ADD_SUCCESS,
    payload: { details: { ...data } },
  });
};

export const removeFriendAction = (data) => (dispatch) => {
  dispatch({
    type: REMOVE_FRIEND_SUCCESS,
    payload: { details: { ...data } },
  });
};
