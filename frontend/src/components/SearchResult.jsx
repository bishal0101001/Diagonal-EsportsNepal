import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// import {
//   cancelFriendRequest,
//   sendFriendRequest,
//   removeFriend,
// } from "../actions/userActions";

const SearchResult = ({ onAdd, onCancel, onRemove, sentRequests, friend }) => {
  const {
    userList,
    userLogin: { userInfo },
    // friends,
  } = useSelector((state) => state);

  const [value, setValue] = useState("");
  // const [sentRequests, setSentRequests] = useState([]);
  // const [sentRequests2, setSentRequests2] = useState([]);
  // const [friend, setFriends] = useState([]);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const alignCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  };

  const onSearch = (e) => {
    setValue(e.target.value);
    // const newSentRequests = sentRequests.filter((item) =>
    //   friends.some((i) => i.details._id !== item.details._id)
    // );
    // setSentRequests(newSentRequests);
    if (e.target.value.trim()) {
      navigate(`/search/${e.target.value}`);
    } else {
      navigate("/teams");
    }
  };

  // useEffect(() => {
  //   setFriends(friends);
  //   if (userInfo.pool?.hasOwnProperty("sentRequests")) {
  //     setSentRequests(userInfo.pool.sentRequests);
  //   } else {
  //     const pool = { ...userInfo.pool };
  //     pool.sentRequests = [];
  //     setSentRequests(pool.sentRequests);
  //   }
  // }, [friends, userInfo.pool]);

  // useMemo(() => {
  //   const newSentRequests = sentRequests2.filter((item) =>
  //     friends.some((i) => i.details._id !== item.details._id)
  //   );
  //   setSentRequests(newSentRequests);
  // }, [friends, sentRequests2]);

  return userInfo ? (
    <div className="__search">
      <div className="search-bar">
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          value={value}
          onChange={onSearch}
        />
      </div>
      {userList.loading ? (
        <Box sx={alignCenter}>
          <CircularProgress />
        </Box>
      ) : userList.users?.length > 0 ? (
        <ul>
          {userList?.users?.map((user) => (
            <li key={user._id}>
              <div>
                <span>
                  <img src="/imgs/solo-clash.webp" alt="profile" />
                </span>
                <p>{user.username}</p>
              </div>
              <div>
                {sentRequests
                  ?.map((item) => item.details._id === user._id)
                  .includes(true) ? (
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => onCancel(user._id)}
                  >
                    Cancel
                  </Button>
                ) : friend
                    ?.map((item) => item.details._id === user._id)
                    .includes(true) ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onRemove(user._id, user.username)}
                  >
                    Remove
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onAdd(user._id, user.username)}
                  >
                    Add
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        value.trim() && <p style={alignCenter}>No user Found!!!</p>
      )}
    </div>
  ) : (
    navigate("/register")
  );
};

export default SearchResult;
