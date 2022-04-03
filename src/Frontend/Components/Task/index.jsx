import React from "react";
import "./index.css";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import { useTask } from "../../context/Task";
import {
  GET_TASK_DETAIL,
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
} from "../../actions/task";

function Index(task) {
  const { title, description, created_at, deadline, priority } = task.task;
  const { dispatch } = useTask();

  const handleOpenTask = () =>
    dispatch({ type: GET_TASK_DETAIL, data: task.task });

  const getPriority = {
    [PRIORITY_HIGH]: { style: "high", name: "HIGH" },
    [PRIORITY_MEDIUM]: { style: "medium", name: "MEDIUM" },
    [PRIORITY_LOW]: { style: "low", name: "LOW" },
  };

  return (
    <div onClick={handleOpenTask} className="task">
      <div className="task-header">{title}</div>
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
    </div>
  );
}

export default Index;
