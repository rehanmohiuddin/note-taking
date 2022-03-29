import React from "react";
import "./index.css";
import Button from "../../../Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../../../context/Task";
import { TASK_MODAL_ACTION } from "../../../actions/task";

function Index() {
  const { dispatch } = useTask();
  return (
    <header className="home-header">
      <Button
        style={"outline"}
        callBack={() => dispatch({ type: TASK_MODAL_ACTION, data: true })}
        data={
          <>
            <FontAwesomeIcon icon={faPlus} />
            Add Task
          </>
        }
      />
      <input className="search-tasks" placeholder="search tasks" />
      <div className="filter-sort-container">
        <div className="filter-sort-icon">
          <FontAwesomeIcon icon={faFilter} />
          Filter
        </div>
        <div className="filter-sort-icon">
          <FontAwesomeIcon icon={faSort} />
          Filter
        </div>
      </div>
    </header>
  );
}

export default Index;
