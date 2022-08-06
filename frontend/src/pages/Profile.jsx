import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout, verify } from "../actions/userActions";
// import Loader from "../components/common/Loader";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleVerification = () => {
    dispatch(verify());
  };

  useEffect(() => {
    if (!userInfo) navigate("/", { replace: true });
  });

  return (
    <div>
      {/* <Loader /> */}
      <button onClick={handleLogout}>Logout</button>
      {userInfo && !userInfo.isVerified && (
        <button onClick={handleVerification}>Verify</button>
      )}
    </div>
  );
};

export default Profile;
