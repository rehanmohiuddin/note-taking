import React from "react";
import "./index.css";
import Button from "../../../Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faSort } from "@fortawesome/free-solid-svg-icons";

function index() {
  return (
    <header className="home-header">
      <Button
        style={"outline"}
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

export default index;
