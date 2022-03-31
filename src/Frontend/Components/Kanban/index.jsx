import React from "react";
import "./index.css";
import Task from "../Task";

function Index({ name, tasks }) {
  return (
    <div className="kanban">
      <div className="kanban-header">{name}</div>
      <div className="kanban-body">
        {tasks.map((_task) => (
          <Task task={_task} />
        ))}
      </div>
    </div>
  );
}

export default Index;
