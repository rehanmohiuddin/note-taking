import React, { useEffect } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import "./index.css";

function Index({ children, closeCallBack }) {
  const [ref, clickedOutside] = useOutsideClick();
  useEffect(() => clickedOutside && closeCallBack(), [clickedOutside]);
  return (
    <div ref={ref} className="filter-sort-container-popup">
      {children}
    </div>
  );
}

export default Index;
