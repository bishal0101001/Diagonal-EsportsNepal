import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "@mui/icons-material/Add";

import SearchResult from "./../components/SearchResult";
import { listUser } from "../actions/userActions";

const Teams = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { keyword } = useParams();

  const {
    userList: users,
    userLogin: { userInfo },
  } = useSelector((state) => state);

  useEffect(() => {
    dispatch(listUser(keyword, userInfo?.token));
  }, [dispatch, keyword, userInfo]);

  // console.log(userInfo.friends, "friends");

  return userInfo ? (
    <div className="__teams">
      <div className="search-box">
        <SearchResult users={users} sourceId={userInfo?._id} />
      </div>
      <div className="friend-list result">
        <h1>Friends</h1>
        <ul>
          {userInfo?.friends?.map((i) => (
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
        {/* <ul>
          <li>
            <div>
              <span>
                <img src="/imgs/solo-clash.webp" alt="profile" />
              </span>
              <p>Name</p>
            </div>
            <div>
              <button type="submit" className="invite-button">
                Invite
                <AddIcon />
              </button>
            </div>
          </li>
        </ul> */}
      </div>
    </div>
  ) : (
    navigate("/register")
  );
};

export default Teams;
