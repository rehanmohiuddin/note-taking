import React from "react";
import "./index.css";
import Logo from "../../../Assets/logo-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faArchive,
  faHeart,
  faHome,
  faSearch,
  faSignOut,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function index() {
  return (
    <nav className="home-nav-bar">
      <img className="nav-logo" src={Logo} />
      <div className="nav-buttons">
        <FontAwesomeIcon className="nav-icon" icon={faHome} />
        <FontAwesomeIcon className="nav-icon" icon={faArchive} />
        <FontAwesomeIcon className="nav-icon" icon={faTrash} />
        <FontAwesomeIcon className="nav-icon" icon={faSignOut} />
      </div>
    </nav>
  );
}

export default index;
