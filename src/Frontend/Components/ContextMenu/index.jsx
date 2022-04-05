import React, { useEffect, useState, useCallback, useRef } from "react";
import useContextMenu from "../../hooks/useContextMenu";
import "./index.css";

const Index = ({ children, x, y, show }) => {
  return (
    <>
      {show && (
        <div
          className="context-menu-container"
          style={{
            top: y,
            left: x,
          }}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Index;
