import React, { useEffect } from "react";
import { useTask } from "../../context/Task";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./index.css";
import Loader from "../Loader";

function Modal({ children, show, closeCallBack }) {
  const [ref, clickedOutside] = useOutsideClick();
  useEffect(() => clickedOutside && closeCallBack(), [clickedOutside]);
  const { loading } = useTask();
  return (
    <div id="kash-modal" class="kash-modal-container">
      <div ref={ref} class="kash-modal">
        {loading ? <Loader /> : children}
      </div>
    </div>
  );
}

export default Modal;
