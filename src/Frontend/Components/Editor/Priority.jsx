import React, { useState, useEffect } from "react";
import {
  COMPLETED,
  IN_PROGRESS,
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  TODO,
} from "../../actions/task";
import useOutsideClick from "../../hooks/useOutsideClick";

function Priority({ setPriority, priority, priorityState }) {
  const options = [PRIORITY_LOW, PRIORITY_MEDIUM, PRIORITY_HIGH];
  const [showOptions, setOptions] = useState(null);
  const [ref, clickedOutside] = useOutsideClick();
  useEffect(() => setOptions(null), [clickedOutside]);
  return (
    <div className="task-section-container">
      <div
        onClick={() => priorityState.enabled && setOptions(!showOptions)}
        class="kash-flex kash-align-center kash-between kash-p-sm kash-relative kash-justify-center"
      >
        <input
          class="kash-input kash-clickable"
          id="kash-select"
          placeholder="Select Status"
          disabled
          value={priority.split("_").join(" ")}
        />
        {showOptions && (
          <ul ref={ref} class="kash-input-select">
            {options.map((_option) => (
              <li onClick={() => setPriority(_option)}>
                <p>{_option.split("_").join(" ")}</p>
              </li>
            ))}
          </ul>
        )}
        <i class="fa fa-chevron-down"></i>
      </div>
    </div>
  );
}

export default Priority;
