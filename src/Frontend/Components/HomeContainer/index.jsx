import React from "react";
import Nav from "../Nav";
import "./index.css";
import Header from "../Header";

function index({ children }) {
  return (
    <div className="home-container">
      <Nav />
      <div className="kash-container main">
        <Header />
        {children}
      </div>
    </div>
  );
}

export default index;
