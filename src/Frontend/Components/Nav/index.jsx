import React from "react";
import "./index.css";
import Logo from "../../../Assets/logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink } from "react-router-dom";
import {
  faArchive,
  faHeart,
  faHome,
  faSearch,
  faSignOut,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function index() {
  const getActiveClassName = (isActive) => isActive && "route-active";
  return (
    <nav className="home-nav-bar">
      <img className="nav-logo" src={Logo} />
      <div className="nav-buttons">
        <NavLink to={"/tasks"}>
          {({ isActive }) => (
            <FontAwesomeIcon
              className={"nav-icon " + getActiveClassName(isActive)}
              icon={faHome}
            />
          )}
        </NavLink>
        <NavLink to={"/archive"}>
          {({ isActive }) => (
            <FontAwesomeIcon
              className={"nav-icon " + getActiveClassName(isActive)}
              icon={faArchive}
            />
          )}
        </NavLink>
        {/* <FontAwesomeIcon className="nav-icon" icon={faSignOut} /> */}
      </div>
    </nav>
  );
}

export default index;
