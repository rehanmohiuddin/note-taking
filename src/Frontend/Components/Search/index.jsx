import React from "react";
import "./index.css";
import Task from "../Task";

function Index({ handleSearch, searchResults = [] }) {
  return (
    <div className="search-container">
      <input
        onChange={handleSearch}
        className="search-tasks"
        placeholder="search tasks"
      />
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((task) => (
            <Task task={task} enableContext={false} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Index;
