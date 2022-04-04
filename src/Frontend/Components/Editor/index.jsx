import React, { useEffect, useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  DraftEditorCommand,
  convertToRaw,
  convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./index.css";
import Modal from "../Modal";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCancel, faPencil, faSave } from "@fortawesome/free-solid-svg-icons";
import RichTextAction from "./RichTextAction";
import { useTask } from "../../context/Task";
import { createTask, updateTask } from "../../services/task";
import {
  CREATE_TASK,
  PRIORITY_LOW,
  TASK_MODAL_ACTION,
  TODO,
  UPDATE_TASK,
} from "../../actions/task";
import Tag from "./Tag";
import Section from "./Section";
import Deadline from "./Deadline";
import Priority from "./Priority";

const TextEditor = () => {
  const initialState = EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(initialState);
  const [taskState, setTaskState] = useState("CREATE");
  const { dispatch, taskDetail } = useTask();
  const [tags, setTags] = useState([]);
  const [title, setTitle] = useState("");
  const [progress, setProgress] = useState(TODO);
  const [deadline, setDeadline] = useState(new Date().toISOString());
  const [priority, setPriority] = useState(PRIORITY_LOW);

  useEffect(() => {
    if (taskDetail) {
      const { title, description, tags } = taskDetail;
      setEditorState(
        EditorState.createWithContent(convertFromRaw(JSON.parse(description)))
      );
      setTitle(title);
      setTags(tags);
      setProgress(taskDetail.section);
      setTaskState("EDIT");
      setDeadline(taskDetail.deadline);
      setPriority(taskDetail.priority);
    }
  }, [taskDetail]);

  const handleAddLink = () => {
    const selection = editorState.getSelection();
    const link = prompt("Please enter the URL of your link");
    if (!link) {
      setEditorState(RichUtils.toggleLink(editorState, selection, null));
      return;
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity("LINK", "MUTABLE", {
      url: link,
    });
    const newEditorState = EditorState.push(
      editorState,
      contentWithEntity,
      "apply-entity"
    );
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const handleTogggleClick = (e, inlineStyle) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };

  const handleBlockClick = (e, blockType) => {
    e.preventDefault();
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  const close = () => dispatch({ type: TASK_MODAL_ACTION, data: false });
  const _createEditTask = async ({ type, taskService, taskObj }) => {
    const taskDescription = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    const task = {
      ...taskObj,
      title: title,
      description: taskDescription,
      tags: tags,
      section: progress,
      deadline: new Date(deadline).toISOString(),
      priority: priority,
    };
    dispatch({ type: type });
    dispatch({ ...(await taskService({ task })) });
  };

  const createEditTaskMapper = () =>
    _createEditTask({
      type: taskDetail ? UPDATE_TASK : CREATE_TASK,
      taskService: taskDetail ? updateTask : createTask,
      taskObj: taskDetail ? taskDetail : {},
    });

  const taskActionMapper = {
    EDIT: {
      showTextActions: false,
      readOnly: true,
      headerName: "Task Details",
      input: {
        disabled: true,
        placeholder: "Task Detail",
        value: "Task Title",
      },
      tag: { enabled: false },
      progress: { enabled: false },
      priority: { enabled: false },
      footerBtn: {
        name: "EDIT",
        action: () => setTaskState("CREATE"),
        icon: (
          <>
            <FontAwesomeIcon icon={faPencil} />
            EDIT
          </>
        ),
      },
    },
    CREATE: {
      showTextActions: true,
      headerName: "Add Task",
      input: {
        disabled: false,
        placeholder: "Task Title",
        value: "",
      },
      tag: { enabled: true },
      progress: { enabled: true },
      priority: { enabled: true },
      readOnly: false,
      footerBtn: {
        name: "CREATE",
        action: createEditTaskMapper,
        icon: (
          <>
            {taskDetail ? (
              <>
                <FontAwesomeIcon icon={faSave} />
                SAVE
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faPencil} />
                CREATE
              </>
            )}
          </>
        ),
      },
    },
  };
  return (
    <Modal
      closeCallBack={() => dispatch({ type: TASK_MODAL_ACTION, data: false })}
    >
      <div className="section">
        <div className="section-header">
          {taskActionMapper[taskState].headerName}
        </div>
        <div className="task-title-container">
          <input
            placeholder="Task Title"
            className="task-title"
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
            disabled={taskActionMapper[taskState].input.disabled}
          />
        </div>
        {taskActionMapper[taskState].showTextActions && (
          <RichTextAction
            handleAddLink={handleAddLink}
            handleBlockClick={handleBlockClick}
            handleTogggleClick={handleTogggleClick}
            editorState={editorState}
          />
        )}
        <Editor
          editorState={editorState}
          onChange={(e) => {
            setEditorState(e);
          }}
          handleKeyCommand={handleKeyCommand}
          placeholder="Task Description"
        />
        <Tag
          tags={tags}
          setTags={setTags}
          tagState={taskActionMapper[taskState].tag}
        />
        <Deadline deadline={deadline} setDeadline={setDeadline} />
        <Section
          progressState={taskActionMapper[taskState].progress}
          progress={progress}
          setProgress={setProgress}
        />
        <Priority
          priorityState={taskActionMapper[taskState].priority}
          priority={priority}
          setPriority={setPriority}
        />
        <div className="section-footer">
          <Button
            style={"outline"}
            type={"button"}
            callBack={close}
            data={
              <>
                <FontAwesomeIcon icon={faCancel} />
                Cancel
              </>
            }
          />
          {
            <Button
              style={"outline"}
              type={"button"}
              callBack={taskActionMapper[taskState].footerBtn.action}
              data={taskActionMapper[taskState].footerBtn.icon}
            />
          }
        </div>
      </div>
    </Modal>
  );
};

export default TextEditor;
