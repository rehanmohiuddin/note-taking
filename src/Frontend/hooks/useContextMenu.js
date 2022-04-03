import React, { useState, useCallback, useEffect, useRef } from "react";

function useContextMenu() {
  const [xPosition, setXPosition] = useState("0px");
  const [yPosition, setYPosition] = useState("0px");
  const [showMenu, setShowMenu] = useState(false);
  const ref = useRef();

  const handleContextMenu = (e) => {
    e.preventDefault();
    setXPosition(`${e.pageX}px`);
    setYPosition(`${e.pageY}px`);
    setShowMenu(true);
  };

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  const closeMenu = () => {
    document.addEventListener("click", () => setShowMenu(null));
    document.removeEventListener("contextmenu", () => setShowMenu(null));
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener("click", handleClick);
      ref.current.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      closeMenu();
    };
  });

  return { xPosition, yPosition, showMenu, ref };
}

export default useContextMenu;
