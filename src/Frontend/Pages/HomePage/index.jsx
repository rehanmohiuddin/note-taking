import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../Assets/kamkaj-logo.png";
import HomeImg from "../../../Assets/List-View-Comp.png";
import "./index.css";
function Index() {
  const nav = useNavigate();
  return (
    <div id="kash-container" class="kash-documentation ">
      <nav className="nav-bar">
        <img src={Logo} />
        <Link className="kash-text-bold kash-h3 get-started" to={"/"}>
          Join Now
        </Link>
      </nav>
      <div className="home-page-main">
        <div className="kash-main-container documentation kash-align-center task-home-page">
          <img className="home-img" src={HomeImg} />
          <div className="kash-pt">
            <h2 className="kash-h2 kash-text-center kash-text-bold heading">
              Meet your modern
              <h2 className="kash-h2 kash-text-bold kash-text-center kash-text-bold heading">
                Note Taking App
              </h2>
            </h2>
            <div className="kash-h5 subheading kash-text-bold-sm kash-text-light kash-text-center kash-p">
              Manage your daily tasks and workflow in a modern way and, <br />
              boost your efficiency without any efforts{" "}
            </div>

            <div>
              <button
                onClick={() => nav("/tasks")}
                className="kash-btn kash-btn-contained btn-join"
              >
                Join Now
              </button>
              <button className="kash-btn kash-btn-outlined btn-sign-up">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
