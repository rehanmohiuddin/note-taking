import React, { useState, useCallback, useEffect } from "react";

function useContextMenu() {
  const [xPosition, setXPosition] = useState("0px");
  const [yPosition, setYPosition] = useState("0px");
  const [showMenu, setShowMenu] = useState(false);

  const handleContextMenu = (e) => {
    e.preventDefault();
    setXPosition(`${e.pageX}px`);
    setYPosition(`${e.pageY}px`);
    setShowMenu(true);
  };

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return { xPosition, yPosition, showMenu };
}

export default useContextMenu;
