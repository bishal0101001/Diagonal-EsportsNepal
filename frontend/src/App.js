import React, { useEffect } from "react";
import io from "socket.io-client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Registers from "./pages/Registers";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Events from "./pages/Events";
import Teams from "./pages/Teams";
import Notifications from "./pages/Notifications";
import GrandEvent from "./pages/Tournament/GrandEvent";
import SquadClash from "./pages/Tournament/SquadClash";
import DeadlyDuo from "./pages/Tournament/DeadlyDuo";
import SoloRule from "./pages/Tournament/SoloRule";
import "./style.min.css";
// import { useEffectOnce } from "./utils/useEffectOnce";
import {
  socketAction,
  // setLiveNotificationAction,
  setNotificationAction,
  cancelFriendRequestAction,
} from "./actions/socketAction";
// import { friendRequest } from "./actions/userActions";
import { decryptUserInfo } from "./utils/decryptUserInfo";
import { logout, setLoginData } from "./actions/userActions";

function App() {
  const [socket, setSocket] = React.useState(null);
  const { userInfo: encryptedUserInfo } = useSelector(
    (state) => state.userLogin
  );
  const dispatch = useDispatch();
  React.useEffect(() => {
    console.log("Starting application");
    !encryptedUserInfo?._id &&
      encryptedUserInfo &&
      decryptUserInfo(encryptedUserInfo)
        .then((res) => {
          dispatch(setLoginData(res));
          return res;
        })
        .then((res) => {
          res.pool.friendRequests &&
            dispatch(setNotificationAction(res.pool.friendRequests));
          return res._id;
        })
        .then((id) => {
          console.log("connecting to socket");
          const socketConnection = io("/api/socket", {
            query: {
              aUxd: id && id,
            },
          });
          console.log("Setting socket connection");

          setSocket(socketConnection);

          dispatch(socketAction(socketConnection));

          socketConnection.on("connect_error", (err) => {
            console.log(`connect_error due to ${err.message}`);
          });
        })
        .catch((err) => {
          console.log(err, "err");
          if (
            (err.response?.status === 401 &&
              err.response.data === "token expired") ||
            (err.response?.data?.message && err.response.data.message) ===
              "User not found"
          ) {
            dispatch(logout());
          }
        });
  }, [encryptedUserInfo, dispatch]);

  useEffect(() => {
    socket?.on("friendRequest", (data) => {
      dispatch(setNotificationAction([{ details: data }]));
    });
  });

  useEffect(() => {
    socket?.on("cancelFriendRequest", (data) => {
      console.log(data, "live req");
      dispatch(cancelFriendRequestAction(data));
    });
  });

  useEffect(() => {
    socket?.on("acceptFriendRequest", (data) => {
      console.log(data, "data from acceptFriendRequests");
    });
  });

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/events/grand-event" element={<GrandEvent />} />
          <Route path="/events/squad-clash" element={<SquadClash />} />
          <Route path="/events/deadly-duo" element={<DeadlyDuo />} />
          <Route path="/events/solo-rule" element={<SoloRule />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/search/:keyword" element={<Teams />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/register" element={<Register />} /> */}
          <Route path="/register" element={<Registers />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
