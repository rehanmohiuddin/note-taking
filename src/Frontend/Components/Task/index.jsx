import React, { useRef, useState, useEffect } from "react";
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
import useContextMenu from "../../hooks/useContextMenu";
import { Draggable } from "react-beautiful-dnd";

function Index({ task, enableContext = true, index }) {
  const {
    _id,
    title,
    description,
    created_at,
    deadline,
    priority,
    isArchived,
  } = task;
  const { dispatch } = useTask();

  const { xPosition, yPosition, showMenu, ref, noClickOnContainer } =
    useContextMenu();

  const handleOpenTask = (e) => {
    noClickOnContainer(e) && dispatch({ type: GET_TASK_DETAIL, data: task });
  };

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

  return (
    <div onClick={handleOpenTask} ref={ref} className="task">
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

      {enableContext && (
        <ContextMenu x={xPosition} y={yPosition} show={showMenu}>
          {taskOptions.map((_task) => (
            <div key={_task.name} onClick={_task.action}>
              {_task.name}
            </div>
          ))}
        </ContextMenu>
      )}
    </div>
  );
}

export default Index;
