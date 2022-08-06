import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { socketAction } from "./actions/socketAction";
import { io } from "socket.io-client";

function SocketConnection() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(socketAction(io("/api/socket")));
  });
  return <></>;
}

export default SocketConnection;
