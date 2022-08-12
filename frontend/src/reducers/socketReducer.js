import {
  ACCEPT_FRIEND_REQUEST,
  DECLINE_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  FRIEND_REQUEST,
  USER_CONNECTED,
} from "../constants/socketConstants";
import { ACCEPT_FRIEND_REQUEST_SUCCESS } from "../constants/userConstants";

export const socketReducer = (state = null, action) => {
  switch (action.type) {
    case USER_CONNECTED:
      return action.payload;
    default:
      return state;
  }
};

export const notificationReducer = (state = { friendRequests: [] }, action) => {
  switch (action.type) {
    case FRIEND_REQUEST:
      return {
        friendRequests: [...state.friendRequests, ...action.payload],
      };

    case CANCEL_FRIEND_REQUEST:
      return {
        ...state,
        friendRequests: state.friendRequests.filter(
          (i) => i.details._id !== action.payload?.details?._id
        ),
      };
    case ACCEPT_FRIEND_REQUEST_SUCCESS:
      return { friendRequests: action.payload };
    default:
      return state;
  }
};

function deleteReqFromArr(arr, data) {
  const index = arr.findIndex((i) => i?.details?._id === data._id);
  arr.splice(index, 1);
  return arr;
}

// export const friendsReducer = (state = null, action) => {
//   switch (action.type) {
//     case ACCEPT_FRIEND_REQUEST:
//       action.payload && friends.push(...action.payload);
//       console.log(action.payload, "action");
//       return friends;
//     case DECLINE_FRIEND_REQUEST:
//       return action.payload;
//     // { friends: action.payload, status: "Declined" };
//     default:
//       return state;
//   }
// };
