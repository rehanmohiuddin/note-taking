import React from "react";
import Nav from "../Nav";
import "./index.css";

function index({ children }) {
  return (
    <div className="home-container">
      <Nav />
      <div className="kash-container main">{children}</div>
    </div>
  );
}

export default index;
