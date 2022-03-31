import React, { useState } from "react";
import "./index.css";
import Button from "../../../Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../../../context/Task";
import {
  FARTHEST_DEADLINE,
  FILTER,
  FILTER_BEFORE_TODAY_DEADLINE,
  FILTER_THIS_MONTH,
  FILTER_THIS_WEEK,
  FILTER_TODAY_DEADLINE,
  NEAREST_DEADLINE,
  PRIORITY_HIGH_TO_LOW,
  PRIORITY_LOW_TO_HIGH,
  SORT,
  TASK_MODAL_ACTION,
} from "../../../actions/task";
import Filter from "../../../Components/FilterSort";

function Index() {
  const { dispatch } = useTask();
  const [openFilter, setFilter] = useState(null);
  const [openSort, setSort] = useState(null);

  const filterOptions = {
    ["Before Today Deadline"]: () =>
      dispatch({ type: FILTER, data: FILTER_BEFORE_TODAY_DEADLINE }),
    ["This Week"]: () => dispatch({ type: FILTER, data: FILTER_THIS_WEEK }),
    ["Today Deadline"]: () =>
      dispatch({ type: FILTER, data: FILTER_TODAY_DEADLINE }),
    ["This Month"]: () => dispatch({ type: FILTER, data: FILTER_THIS_MONTH }),
  };

  const sortOptions = {
    ["Priority High To Low"]: () =>
      dispatch({ type: SORT, data: PRIORITY_HIGH_TO_LOW }),
    ["Priority Low To High"]: () =>
      dispatch({ type: SORT, data: PRIORITY_LOW_TO_HIGH }),
    ["Nearest Deadline"]: () =>
      dispatch({ type: SORT, data: NEAREST_DEADLINE }),
    ["Farthest Deadline"]: () =>
      dispatch({ type: SORT, data: FARTHEST_DEADLINE }),
  };

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
        <div
          onClick={() => setFilter(!openFilter)}
          className="filter-sort-icon"
        >
          <FontAwesomeIcon icon={faFilter} />
          Filter
          {openFilter && (
            <Filter closeCallBack={() => setFilter(null)}>
              {Object.keys(filterOptions).map((_opt) => (
                <div
                  className="task-action-option"
                  onClick={filterOptions[_opt]}
                >
                  {_opt}
                </div>
              ))}
            </Filter>
          )}
        </div>

        <div onClick={() => setSort(!openSort)} className="filter-sort-icon">
          <FontAwesomeIcon icon={faSort} />
          Sort
          {openSort && (
            <Filter closeCallBack={() => setSort(null)}>
              {Object.keys(sortOptions).map((_opt) => (
                <div className="task-action-option" onClick={sortOptions[_opt]}>
                  {_opt}
                </div>
              ))}
            </Filter>
          )}
        </div>
      </div>
    </header>
  );
}

export default Index;
