import React from "react";
import "./index.css";
import Task from "../Task";
import { Droppable } from "react-beautiful-dnd";
import { Draggable } from "react-beautiful-dnd";

function Index({ _id, name, tasks, index }) {
  return (
    <Droppable droppableId={_id} type={"kanban"} index={index}>
      {(provided, snapshot) => (
        <div
          className="kanban"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="kanban-header">{name}</div>
          <div className="kanban-body">
            {tasks.map((_task, index) => (
              <Draggable draggableId={_task._id} index={index} key={_task._id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Task task={_task} index={index} />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

export default Index;
