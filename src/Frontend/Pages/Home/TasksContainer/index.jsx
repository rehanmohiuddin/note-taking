import React from "react";
import Kanban from "../../../Components/Kanban";
import "./index.css";

function index() {
  const kanban = [
    { name: "TODO", tasks: [1, 2, 3] },
    { name: "IN PROGRESS", tasks: [1, 2] },
    { name: "COMPLETED", tasks: [1] },
  ];
  return (
    <div className="kanban-container">
      {kanban.map((_kanban) => (
        <Kanban name={_kanban.name} tasks={_kanban.tasks} />
      ))}
    </div>
  );
}

export default index;
