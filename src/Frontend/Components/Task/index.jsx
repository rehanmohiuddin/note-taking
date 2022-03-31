import React, { useRef } from "react";
import "./index.css";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { useTask } from "../../context/Task";
import {
  GET_TASK_DETAIL,
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
} from "../../actions/task";
import ContextMenu from "../ContextMenu";
import { archiveTask, deleteTask, unArchiveTask } from "../../services/task";

function Index(task) {
  const { title, description, created_at, deadline, priority, isArchived } =
    task.task;
  const { dispatch } = useTask();
  const ref = useRef();

  const handleOpenTask = () =>
    dispatch({ type: GET_TASK_DETAIL, data: task.task });

  const getPriority = {
    [PRIORITY_HIGH]: { style: "high", name: "HIGH" },
    [PRIORITY_MEDIUM]: { style: "medium", name: "MEDIUM" },
    [PRIORITY_LOW]: { style: "low", name: "LOW" },
  };

  const taskOptions = [
    {
      name: isArchived ? "Un Archive" : "Archive",
      action: async () =>
        dispatch({
          ...(isArchived ? await unArchiveTask(task) : await archiveTask(task)),
        }),
    },
    {
      name: "Delete",
      action: async () => dispatch({ ...(await deleteTask(task)) }),
    },
  ];
  console.log("REFF", ref);
  return (
    <div ref={ref} className="task">
      <div onClick={handleOpenTask} className="task-header">
        {title}
      </div>
      <div className="task-body">
        <Editor
          editorState={EditorState.createWithContent(
            convertFromRaw(JSON.parse(description))
          )}
          readOnly={true}
        />
      </div>
      <div className="task-footer">
        <div className="task-date">
          {new Date(deadline).toLocaleDateString()}
        </div>
        <div className={"priority " + getPriority[priority].style}>
          {getPriority[priority].name}
        </div>
      </div>
      <ContextMenu ref={ref.current}>
        {taskOptions.map((_task) => (
          <div key={_task.name} onClick={_task.action}>
            {_task.name}
          </div>
        ))}
      </ContextMenu>
    </div>
  );
}

export default Index;
