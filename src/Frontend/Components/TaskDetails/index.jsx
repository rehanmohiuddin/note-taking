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
import { faCancel, faEdit, faSave } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
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
  return (
    <Modal closeCallBack={() => console.log("close")}>
      <div className="section">
        <div className="section-header">Add Task</div>
        <div className="task-title-container">
          <input placeholder="Task Title" className="task-title" />
        </div>
        <div className="btn-container">
          <button onMouseDown={(e) => handleBlockClick(e, "header-one")}>
            H1
          </button>
          <button onMouseDown={(e) => handleBlockClick(e, "header-two")}>
            H2
          </button>
          <button onMouseDown={(e) => handleBlockClick(e, "header-three")}>
            H3
          </button>
          <button onMouseDown={(e) => handleBlockClick(e, "unstyled")}>
            Normal
          </button>
          <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>
            bold
          </button>
          <button onMouseDown={(e) => handleTogggleClick(e, "UNDERLINE")}>
            underline
          </button>
          <button onMouseDown={(e) => handleTogggleClick(e, "ITALIC")}>
            italic
          </button>
          <button onMouseDown={(e) => handleTogggleClick(e, "STRIKETHROUGH")}>
            strikthrough
          </button>
          <button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>
            Ordered List
          </button>
          <button
            onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}
          >
            Unordered List
          </button>
          <button
            onMouseDown={(e) => {
              e.preventDefault();
            }}
          >
            image
          </button>
          <button
            disabled={editorState.getSelection().isCollapsed()}
            onMouseDown={(e) => {
              e.preventDefault();
              handleAddLink();
            }}
          >
            link
          </button>

          <button onMouseDown={(e) => handleBlockClick(e, "ordered-list-item")}>
            Point Wise
          </button>
        </div>
        <Editor
          onChange={(e) => {
            setEditorState(e);
          }}
          handleKeyCommand={handleKeyCommand}
          editorState={EditorState
            .createWithContent
            // convertFromRaw(JSON.parse())
            ()}
          readOnly={true}
        />
        <div className="section-footer">
          <Button
            style={"outline"}
            type={"button"}
            callBack={close}
            data={
              <>
                <FontAwesomeIcon icon={faCancel} />
                Close
              </>
            }
          />
          <Button
            style={"outline"}
            type={"button"}
            data={
              <>
                <FontAwesomeIcon icon={faEdit} />
                EDIT
              </>
            }
          />
        </div>
      </div>
    </Modal>
  );
};

export default Index;
