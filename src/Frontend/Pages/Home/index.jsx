import React from "react";
import "./index.css";
import HomeContainer from "../../Components/HomeContainer";
import Header from "./Header";
import KanbanContainer from "./TasksContainer";
import Editor from "../../Components/Editor";

function index() {
  return (
    <HomeContainer>
      <Header />
      <KanbanContainer />
      <Editor />
    </HomeContainer>
  );
}

export default index;
