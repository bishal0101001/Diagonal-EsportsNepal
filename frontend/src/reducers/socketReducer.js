import {
  CANCEL_FRIEND_REQUEST,
  FRIEND_REQUEST,
  USER_CONNECTED,
} from "../constants/socketConstants";

// let friendReq = [];
// let friendRequests = [];
export const socketReducer = (state = null, action) => {
  switch (action.type) {
    case USER_CONNECTED:
      return action.payload;
    default:
      return state;
  }
};

export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case FRIEND_REQUEST:
      // action.payload && friendRequests.push(...action.payload);
      return { friendRequests: action.payload };
    case CANCEL_FRIEND_REQUEST:
      return { friendRequests: action.payload };
    default:
      return state;
  }
};
