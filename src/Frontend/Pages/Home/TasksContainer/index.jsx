import React from "react";
import { useEffect } from "react";
import { GET_TASKS } from "../../../actions/task";
import Kanban from "../../../Components/Kanban";
import Loader from "../../../Components/Loader";
import { useTask } from "../../../context/Task";
import { getTasks } from "../../../services/task";
import "./index.css";

function Index() {
  const { loading, dispatch, tasks, kanban } = useTask();
  useEffect(async () => {
    dispatch({ type: GET_TASKS });
    dispatch({ ...(await getTasks()) });
  }, []);
  return (
    <div className="kanban-container">
      {loading ? (
        <Loader />
      ) : (
        Object.keys(kanban).map((_kanban) => (
          <Kanban name={_kanban} tasks={kanban[_kanban]} />
        ))
      )}
    </div>
  );
}

export default Index;
