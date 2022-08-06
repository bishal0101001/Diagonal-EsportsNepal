import {
  USER_CONNECTED,
  FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  ACCEPT_FRIEND_REQUEST,
} from "../constants/socketConstants";

let friendRequests = [];

export const socketAction = (socketConnection) => async (dispatch) => {
  dispatch({
    type: USER_CONNECTED,
    payload: socketConnection,
  });
};

export const setNotificationAction = (data) => (dispatch) => {
  data && friendRequests.push(...data);
  dispatch({
    type: FRIEND_REQUEST,
    payload: friendRequests,
  });
};

export const setLiveNotificationAction = (data) => (dispatch) => {
  data && friendRequests.push(...data);
  dispatch({
    type: FRIEND_REQUEST,
    payload: friendRequests,
  });
};

export const cancelFriendRequestAction = (data) => (dispatch) => {
  deleteReqFromArr(data);
  dispatch({
    type: CANCEL_FRIEND_REQUEST || ACCEPT_FRIEND_REQUEST,
    payload: friendRequests,
  });
};

// export const acceptFriendRequestAction = data => dispatch => {}

function deleteReqFromArr(data) {
  const index = friendRequests.findIndex((i) => i?.details?._id === data._id);
  friendRequests.splice(index, 1);
}
