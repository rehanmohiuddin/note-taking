import React from "react";
import "./index.css";
import HomeContainer from "../../Components/HomeContainer";
import KanbanContainer from "./TasksContainer";
import Editor from "../../Components/Editor";
import { useTask } from "../../context/Task";

function Index() {
  const { openTaskModal } = useTask();
  return (
    <HomeContainer>
      <KanbanContainer />
      {openTaskModal && <Editor />}
    </HomeContainer>
  );
}

export default Index;
