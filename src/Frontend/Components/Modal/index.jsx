import React, { useEffect } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./index.css";

function Modal({ children, show, closeCallBack }) {
  const [ref, clickedOutside] = useOutsideClick();
  useEffect(() => clickedOutside && closeCallBack(), [clickedOutside]);
  return (
    <div id="kash-modal" class="kash-modal-container">
      <div ref={ref} class="kash-modal">
        {children}
      </div>
    </div>
  );
}

export default Modal;
