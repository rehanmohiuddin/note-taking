import React, { useState, useEffect } from "react";
import { COMPLETED, IN_PROGRESS, TODO } from "../../actions/task";
import useOutsideClick from "../../hooks/useOutsideClick";

function Section({ setProgress, progressState, progress }) {
  const options = [TODO, IN_PROGRESS, COMPLETED];
  const [showOptions, setOptions] = useState(null);
  const [ref, clickedOutside] = useOutsideClick();
  useEffect(() => setOptions(null), [clickedOutside]);
  return (
    <div className="task-section-container">
      <div
        onClick={() => progressState.enabled && setOptions(!showOptions)}
        class="kash-flex kash-align-center kash-between kash-p-sm kash-relative kash-justify-center"
      >
        <input
          class="kash-input kash-clickable"
          id="kash-select"
          placeholder="Select Status"
          disabled
          value={progress}
        />
        {showOptions && (
          <ul ref={ref} class="kash-input-select">
            {options.map((_option) => (
              <li onClick={() => setProgress(_option)}>
                <p>{_option}</p>
              </li>
            ))}
          </ul>
        )}
        <i class="fa fa-chevron-down"></i>
      </div>
    </div>
  );
}

export default Section;
