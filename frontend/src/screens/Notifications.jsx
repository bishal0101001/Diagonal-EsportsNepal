import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import axios from "axios";
import { acceptFriendRequests as acceptFriendRequestAction } from "../actions/userActions";

const Notifications = () => {
  const dispatch = useDispatch();
  const {
    notifications,
    userLogin: { userInfo },
    friends,
  } = useSelector((state) => state);

  const handleAccept = (sourceId) => {
    // console.log(sourceId, "sourceId");
    dispatch(
      acceptFriendRequestAction(
        sourceId,
        userInfo._id,
        userInfo.token,
        notifications?.friendRequests
      )
    );
    console.log("accept clicked");
  };
  return (
    <div className="__notifications">
      <div className="tournament-invitation">
        <h1>Notification</h1>
      </div>
      <div className="friend-request friend-list">
        <h1>Friend Requests</h1>
        <div className="lists">
          <ul>
            {notifications?.friendRequests?.map((item, index) => (
              <li key={index}>
                <div>
                  <span>
                    <img src="/imgs/solo-clash.webp" alt="profile" />
                  </span>
                  <p>{item?.details?.username}</p>
                </div>
                <div>
                  <button
                    type="submit"
                    className="invite-button"
                    onClick={() => handleAccept(item.details._id)}
                  >
                    Accept
                  </button>
                  <button type="submit" className="delete-button">
                    Decline
                  </button>
                </div>
              </li>
            ))}
            <li>
              <div>
                <span>
                  <img src="/imgs/solo-clash.webp" alt="profile" />
                </span>
                <p>Name</p>
              </div>
              <div>
                <button type="submit" className="invite-button">
                  Accept
                </button>
                <button type="submit" className="delete-button">
                  Decline
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
