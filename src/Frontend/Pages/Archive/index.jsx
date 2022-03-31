import React, { useEffect } from "react";
import HomeContainer from "../../Components/HomeContainer";
import KanbanContainer from "../Home/TasksContainer";
import Editor from "../../Components/Editor";
import { useTask } from "../../context/Task";
import { getArchivedTasks } from "../../services/task";

function Index() {
  const { openTaskModal, dispatch } = useTask();

  useEffect(async () => dispatch({ ...(await getArchivedTasks()) }), []);

  return (
    <HomeContainer>
      <KanbanContainer />
      {openTaskModal && <Editor />}
    </HomeContainer>
  );
}

export default Index;
