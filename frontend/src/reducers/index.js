import { combineReducers } from "redux";

import {
  tableDataReducer,
  sortColumnReducer,
  tournamentDataReducer,
} from "./tournamentDataReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userSendFriendRequestReducer,
  // acceptFriendRequestReducer,
  friendsReducer,
} from "./userReducer";
import {
  registerForTournamentReducer,
  paymentReducer,
} from "./tournamentReducer";
import { socketReducer, notificationReducer } from "./socketReducer";

export default combineReducers({
  socket: socketReducer,
  tournamentData: tournamentDataReducer,
  tableData: tableDataReducer,
  sortColumn: sortColumnReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userList: userListReducer,
  sendRequest: userSendFriendRequestReducer,
  registeredForTournament: registerForTournamentReducer,
  isPaid: paymentReducer,
  notifications: notificationReducer,
  // acceptFriendRequest: acceptFriendRequestReducer,
  friends: friendsReducer,
});
