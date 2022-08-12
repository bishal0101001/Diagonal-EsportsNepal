import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_VERIFY_REQUEST,
  USER_VERIFY_SUCCESS,
  USER_VERIFY_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_FRIEND_INVOKE_REQUEST,
  USER_FRIEND_INVOKE_SUCCESS,
  USER_FRIEND_INVOKE_FAIL,
  USER_FRIEND_CANCEL_REQUEST,
  USER_FRIEND_CANCEL_SUCCESS,
  USER_FRIEND_CANCEL_FAIL,
  ACCEPT_FRIEND_REQUEST_SUCCESS,
  ACCEPT_FRIEND_REQUEST_FAILED,
  REMOVE_FRIEND_SUCCESS,
  REMOVE_FRIEND_FAILED,
  FRIENDS_LOAD_SUCCESS,
  FRIEND_ADD_SUCCESS,
} from "./../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userVerifyRequest = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true };
    case USER_VERIFY_SUCCESS:
      return { loading: false, verification: action.payload };
    case USER_VERIFY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userSendFriendRequestReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case USER_FRIEND_INVOKE_REQUEST:
      return { loading: true, success: false };
    case USER_FRIEND_INVOKE_SUCCESS:
      return { loading: false, users: action.payload, success: true };
    case USER_FRIEND_INVOKE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const userCancelFriendRequestReducer = (state = null, action) => {
  switch (action.type) {
    case USER_FRIEND_CANCEL_REQUEST:
      return { loading: true };
    case USER_FRIEND_CANCEL_SUCCESS:
      return { loading: false, success: true };
    case USER_FRIEND_CANCEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

// let friends = [];

export const friendsReducer = (state = [], action) => {
  const newState = [...state];
  switch (action.type) {
    case FRIENDS_LOAD_SUCCESS:
      newState.push(...action.payload);
      return newState;
    case FRIEND_ADD_SUCCESS:
      if (
        newState.findIndex(
          (i) => i.details._id === action.payload.details._id
        ) < 0
      ) {
        newState.push(action.payload);
      }
      return newState;
    case REMOVE_FRIEND_SUCCESS:
      const newFriendsList = newState.filter(
        (i) => i.details._id !== action.payload.details._id
      );
      console.log(newFriendsList, "newList");
      return newFriendsList;
    default:
      return state;
  }
};

// export const acceptFriendRequestReducer = (state = null, action) => {
//   switch (action.type) {
//     case ACCEPT_FRIEND_REQUEST_SUCCESS:
//       friends.push(action.payload);
//       return { success: true, friends };
//     case ACCEPT_FRIEND_REQUEST_FAILED:
//       return { success: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// export const removeFriendRequestReducer = (state = null, action) => {
//   switch (action.type) {
//     case REMOVE_FRIEND_SUCCESS:
//       return { success: true };
//     case REMOVE_FRIEND_FAILED:
//       return { success: false, error: action.payload };
//     default:
//       return state;
//   }
// };
