import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Icons } from "../services/Icons";

// import { Navigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.userLogin);

  const auth = userInfo ? false : true;

  const [clicked, setClicked] = useState({
    activeIcon: { id: 1 },
    icons: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
  });

  const clickHandler = (index) => {
    setClicked({ ...clicked, activeIcon: clicked.icons[index] });
  };

  const toggleActive = (index) =>
    clicked.icons[index].id === clicked.activeIcon.id ? "red" : "white";

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className="__header">
        <div className="top-section">
          <div className="logo-container">
            <Link to="/">
              <h2>
                Esports <span>Nepal</span>
              </h2>
            </Link>
          </div>
          <div className="countdown">
            <h1>Next Event In - 00:00:59</h1>
          </div>
          {auth && (
            <div className="buttons">
              <button
                className="sign-up"
                onClick={() => handleClick("/register")}
              >
                Sign Up
              </button>
              <button className="login" onClick={() => handleClick("/login")}>
                Login
              </button>
            </div>
          )}
        </div>
        <div className="bottom-section">
          <div className="menu-wrapper">
            <ul className="menu">
              {Icons.map((data, index) => {
                if (index === 4) data.auth = auth;

                return (
                  !data.auth && (
                    <li key={data.id} className="menu-items">
                      <Link to={data.path}>
                        <div onClick={() => clickHandler(index)}>
                          <div className="nav-icon">
                            <div className="icons">
                              {data.icon(
                                index,
                                clickHandler,
                                toggleActive(index)
                              )}
                            </div>
                            <div className={toggleActive(index)}>
                              {data.name}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
