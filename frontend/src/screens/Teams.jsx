import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";

import SearchResult from "../components/SearchResult";
import {
  listUser,
  cancelFriendRequest,
  sendFriendRequest,
  removeFriend,
} from "../actions/userActions";

const Teams = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [friend, setFriends] = useState(null);
  const [sentRequests, setSentRequests] = useState([]);

  const { keyword } = useParams();

  const {
    userLogin: { userInfo },
    friends,
  } = useSelector((state) => state);

  const handleAdd = (userId, username) => {
    setSentRequests((prevState) => {
      const newState = Array.from(prevState);
      if (newState.findIndex((i) => i.details._id === userId) >= 0) {
        newState.push({ details: { _id: userId, username } });
      }
      return newState;
    });
    dispatch(sendFriendRequest(userInfo._id, userId, userInfo.token));
  };

  const handleCancel = (userId) => {
    const sentReq = sentRequests;
    const newArr = sentReq.filter((item) => item.details._id !== userId);
    setSentRequests(newArr);
    dispatch(cancelFriendRequest(userInfo._id, userId, userInfo.token));
  };

  const handleRemove = (userId) => {
    const friend = friends;
    const newArr = friend.filter((item) => item.details._id !== userId);
    setFriends(newArr);
    dispatch(removeFriend(userInfo._id, userId, userInfo.token));
  };

  useEffect(() => {
    dispatch(listUser(keyword, userInfo?.token));
  }, [dispatch, keyword, userInfo]);

  useEffect(() => {
    setFriends(friends);
    if (userInfo.pool?.hasOwnProperty("sentRequests")) {
      const newSentRequests =
        friends.length > 0
          ? userInfo.pool.sentRequests.filter((item) =>
              friends.some((i) => i.details._id !== item.details._id)
            )
          : userInfo.pool.sentRequests;
      setSentRequests(newSentRequests);
    } else {
      const pool = { ...userInfo.pool };
      pool.sentRequests = [];
      setSentRequests(pool.sentRequests);
    }
  }, [friends, userInfo.pool]);

  return userInfo ? (
    <div className="__teams">
      <div className="search-box">
        <SearchResult
          friend={friend}
          sentRequests={sentRequests}
          onAdd={handleAdd}
          onCancel={handleCancel}
          onRemove={handleRemove}
        />
      </div>
      <div className="friend-list result">
        <h1>Friends</h1>
        <ul>
          {friend?.map((i) => (
            <li key={i.details._id}>
              <div>
                <span>
                  <img src="/imgs/solo-clash.webp" alt="profile" />
                </span>
                <p>{i.details.username}</p>
              </div>
              <div>
                <button type="submit" className="invite-button">
                  Invite
                  <AddIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    navigate("/register")
  );
};

export default Teams;
