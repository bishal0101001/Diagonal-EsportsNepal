import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { cancelFriendRequest, sendFriendRequest } from "../actions/userActions";

const SearchResult = ({ users: usersList, sourceId }) => {
  const {
    userLogin: { userInfo },
  } = useSelector((state) => state);
  const [value, setValue] = useState("");
  const [sentRequests, setSentRequests] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const alignCenter = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "50vh",
  };

  const handleSearch = (e) => {
    setValue(e.target.value);

    if (e.target.value.trim()) {
      navigate(`/search/${e.target.value}`);
    } else {
      navigate("/teams");
    }
  };

  const handleAdd = (userId, username) => {
    let sentReq = sentRequests;
    sentReq.push({ details: { _id: userId, username } });
    setSentRequests(sentReq);
    dispatch(sendFriendRequest(sourceId, userId, userInfo.token));
  };

  const handleCancel = (userId) => {
    const sentReq = sentRequests;
    const newArr = sentReq.filter((item) => item.details._id !== userId);
    setSentRequests(newArr);
    dispatch(cancelFriendRequest(sourceId, userId, userInfo.token));
  };

  useEffect(() => {
    if (userInfo.pool?.hasOwnProperty("sentRequests")) {
      setSentRequests(userInfo.pool.sentRequests);
    } else {
      const pool = { ...userInfo.pool };
      pool.sentRequests = [];
      setSentRequests(pool.sentRequests);
    }
  }, [setSentRequests, userInfo]);

  return userInfo ? (
    <div className="__search">
      <div className="search-bar">
        <TextField
          id="outlined-basic"
          label="Search..."
          variant="outlined"
          value={value}
          onChange={handleSearch}
        />
      </div>
      {usersList.loading ? (
        <Box sx={alignCenter}>
          <CircularProgress />
        </Box>
      ) : usersList.users?.length > 0 ? (
        <ul>
          {usersList.users.map((user) => (
            <li key={user._id}>
              {/* {console.log(user, "user")} */}
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
                    onClick={() => handleCancel(user._id)}
                  >
                    Cancel
                  </Button>
                ) : (
                  // <InteractiveButton
                  //   handleAdd={() => handleAdd(user._id)}
                  //   // loading={sendRequest?.loading}
                  //   // success={sendRequest?.success}
                  // />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAdd(user._id, user.username)}
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
