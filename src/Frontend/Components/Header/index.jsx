import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./index.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPlus, faSort } from "@fortawesome/free-solid-svg-icons";
import { useTask } from "../../context/Task";
import {
  FARTHEST_DEADLINE,
  FILTER,
  FILTER_BEFORE_TODAY_DEADLINE,
  FILTER_BY_TAGS,
  FILTER_THIS_MONTH,
  FILTER_THIS_WEEK,
  FILTER_TODAY_DEADLINE,
  NEAREST_DEADLINE,
  PRIORITY_HIGH_TO_LOW,
  PRIORITY_LOW_TO_HIGH,
  SORT,
  TASK_MODAL_ACTION,
} from "../../actions/task";
import Filter from "../FilterSort";
import { getTags, getTasks, searchTask } from "../../services/task";
import Search from "../Search";

function Index() {
  const { dispatch, selectedFilter, tags, searchResults } = useTask();
  const [openFilter, setFilter] = useState(null);
  const [openSort, setSort] = useState(null);
  const [openTags, setTags] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(async () => dispatch({ ...(await getTags()) }), []);

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

  const handleClearFilter = async () => dispatch({ ...(await getTasks()) });

  const debounce = (fn) => {
    let timer;
    return (query) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn(query);
      }, 300);
    };
  };

  const searchDispatch = async (query) => {
    dispatch({ ...(await searchTask({ query: query })) });
  };

  const serachFn = useCallback((query) => {
    searchDispatch(query);
  }, []);

  const searchDebounce = debounce(serachFn);

  const memoizeHandleSearch = useCallback((e) => {
    const query = e.target.value.toLowerCase();
    setQuery(query);
    searchDebounce(query);
  }, []);

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
      <Search
        handleSearch={memoizeHandleSearch}
        searchResults={query.length > 0 ? searchResults : []}
      />
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
        <div onClick={() => setTags(!openTags)} className="filter-sort-icon">
          <FontAwesomeIcon icon={faSort} />
          Tags
          {openTags && (
            <Filter closeCallBack={() => setTags(null)}>
              {tags.map((_tag) => (
                <div
                  className="task-action-option"
                  onClick={() => dispatch({ type: FILTER_BY_TAGS, data: _tag })}
                >
                  {_tag.name}
                </div>
              ))}
            </Filter>
          )}
        </div>
        {selectedFilter && (
          <div onClick={handleClearFilter} className="task-action-option">
            Clear All
          </div>
        )}
      </div>
    </header>
  );
}

export default Index;
