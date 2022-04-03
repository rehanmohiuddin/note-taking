import React from "react";
import "./index.css";

function Deadline({ setDeadline, deadline }) {
  const parseDateForInput = () => {
    const _date = new Date(deadline).toLocaleDateString().split("/");
    return `${_date[2]}-${_date[0]}-${_date[1]}`;
  };
  return (
    <div className="deadline-container">
      <div>Deadline</div>
      <input
        type={"date"}
        className="deadline-input"
        defaultValue={parseDateForInput()}
        onChange={(e) => setDeadline(e.target.value)}
      />
    </div>
  );
}

export default Deadline;
