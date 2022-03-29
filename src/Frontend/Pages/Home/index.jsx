import React from "react";
import "./index.css";
import HomeContainer from "../../Components/HomeContainer";
import Header from "./Header";

function index() {
  return (
    <HomeContainer>
      <Header />
      <div>Home</div>
    </HomeContainer>
  );
}

export default index;
