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
import { GET_TASK_DETAIL } from "../../actions/task";

function Index(task) {
  const { title, description, created_at } = task.task;
  const { dispatch } = useTask();
  const handleOpenTask = () =>
    dispatch({ type: GET_TASK_DETAIL, data: task.task });
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
      <div className="task-date">
        {new Date(created_at).toLocaleDateString()}
      </div>
    </div>
  );
}

export default Index;
