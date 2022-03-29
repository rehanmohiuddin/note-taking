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

const TextEditor = () => {
  const initialState = EditorState.createEmpty();
  const [editorState, setEditorState] = React.useState(initialState);
  const [taskState, setTaskState] = useState("CREATE");
  const handleSave = () => {
    const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
  };

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
  const close = () => {};
  //   console.log({ editorState });
  //   console.log(convertToRaw(editorState.getCurrentContent()).blocks);
  const taskActionMapper = {
    EDIT: {
      showTextActions: false,
      readOnly: true,
      headerName: "Task Details",
      input: {
        disabled: true,
        placeholder: "Task Detail",
        value: "task title",
      },
      footerBtn: {
        name: "EDIT",
        action: close,
        icon: (
          <>
            <FontAwesomeIcon icon={faPencil} />
            SAVE
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
      readOnly: false,
      footerBtn: {
        name: "CREATE",
        action: close,
        icon: (
          <>
            <FontAwesomeIcon icon={faSave} />
            CREATE
          </>
        ),
      },
    },
  };
  return (
    <Modal closeCallBack={() => console.log("close")}>
      <div className="section">
        <div className="section-header">
          {taskActionMapper[taskState].headerName}
        </div>
        <div className="task-title-container">
          <input
            placeholder="Task Title"
            className="task-title"
            defaultValue={taskActionMapper[taskState].input.value}
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
              callBack={taskActionMapper[taskState].action}
              data={taskActionMapper[taskState].footerBtn.icon}
            />
          }
        </div>
      </div>
    </Modal>
  );
};

export default TextEditor;
