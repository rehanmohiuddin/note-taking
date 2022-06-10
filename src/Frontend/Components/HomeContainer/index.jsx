import React, { useRef, useState } from "react";
import Nav from "../Nav";
import "./index.css";
import Header from "../Header";

function Index({ children }) {
  const [openNav, setNav] = useState(null);

  return (
    <div className="home-container">
      <div className="desktop-side-nav">
        <Nav />
      </div>

      {openNav && (
        <div className="mobile-side-nav">
          <Nav />
        </div>
      )}

      <div className="kash-container main">
        <Header setNav={() => setNav(!openNav)} />
        {children}
      </div>
    </div>
  );
}

export default Index;
