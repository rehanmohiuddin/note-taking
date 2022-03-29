import React from "react";

function RichTextAction({
  handleAddLink,
  handleBlockClick,
  handleTogggleClick,
  editorState,
}) {
  return (
    <div className="btn-container">
      <button onMouseDown={(e) => handleBlockClick(e, "header-one")}>H1</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-two")}>H2</button>
      <button onMouseDown={(e) => handleBlockClick(e, "header-three")}>
        H3
      </button>
      <button onMouseDown={(e) => handleBlockClick(e, "unstyled")}>
        Normal
      </button>
      <button onMouseDown={(e) => handleTogggleClick(e, "BOLD")}>bold</button>
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
      <button onMouseDown={(e) => handleBlockClick(e, "unordered-list-item")}>
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
  );
}

export default RichTextAction;
