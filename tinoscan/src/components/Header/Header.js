import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";

import "./Header.scss";
import { PrimaryButton } from "../Button/Button";
import logo from "../../assets/imgs/logo.svg";

const Header = () => {
  const headerNav = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Transactions",
      path: "/transactions",
    },
  ];

  const profile = [
    {
      name: "Profile",
      path: "/profile",
    },
    {
      name: "Model",
      path: "/model",
    },
    {
      name: "Settings",
      path: "/settings",
    },
  ];
  const [toggle, setToggle] = useState(false);
  const data = localStorage.getItem("data")
    ? JSON.parse(window.localStorage.getItem("data"))
    : null;
  const [user, setUser] = useState([]);
  console.log(user);
  useEffect(() => {
    setUser(data);
    // eslint-disable-next-line
  }, [])

  const { pathName } = useLocation();
  const headerRef = useRef(null);

  const active = headerNav.findIndex((e) => e.path === pathName);
  const menuToggle = () => {
    setToggle(!toggle);
  };

  const signOutHandler = () => {
    window.localStorage.removeItem("data");
    window.location.reload(true);
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <Link to="/" className="header__menu-left">
          <img src={logo} alt="" className="header__menu-left__logo" />
          <div className="header__menu-left__logo__text">TScan</div>
        </Link>
        <div className="header__menu-mobile">
          <div className="header__menu-mobile__toggle" onClick={menuToggle}>
            <FontAwesomeIcon icon={faBars} size="2x" />
          </div>
          <ul className={`header__menu-mobile__list ${toggle ? "active" : ""}`}>
            {headerNav.map((item, index) => (
              <Link to={item.path} key={index}>
                <li className="header__menu-mobile__item" onClick={menuToggle}>
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="header__menu-right">
          <ul className="header__menu-right__list">
            {headerNav.map((item, index) => (
              <Link to={item.path} key={index}>
                <li
                  className={`header__menu-right__item ${
                    index === active ? "active" : ""
                  }`}
                  onClick={() => {}}
                >
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
          {user ? (
            <div className="header__menu-right__account">
              <div className="header__menu-right__account__wrap">
                <FontAwesomeIcon icon={faCircleUser} />
                <span className="header__menu-right__account__name">
                  {user.userName ? user.userName : "NoName"}
                </span>
                <FontAwesomeIcon icon={faChevronDown} size="xs" />
              </div>
              <ul className="header__menu-right__account__list">
                {profile.map((item, index) => (
                  <Link to={item.path} key={index}>
                    <li className="header__menu-right__account__item">
                      {item.name}
                    </li>
                  </Link>
                ))}
                <div className="header__menu-right__account__btn">
                  <PrimaryButton
                    onClick={signOutHandler}
                    style={{ width: "100%" }}
                  >
                    Sign out
                  </PrimaryButton>
                </div>
              </ul>
            </div>
          ) : (
            <div className="header__menu-right__account">
              <Link to="/login">
                <div className="login">Login</div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
