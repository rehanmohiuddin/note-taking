import { createContext, useReducer, useContext } from "react";
import { taskState } from "../actions/task";
import { taskReducer } from "../reducers/task";

const TaskContext = createContext(taskState);

const TaskProvider = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, taskState);
  return (
    <TaskContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => useContext(TaskContext);

export { TaskProvider, useTask };
