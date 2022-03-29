import {
  CREATE_TASK,
  CREATE_TASK_FAILURE,
  CREATE_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_FAILURE,
  GET_TASKS_SUCCESS,
  taskState,
  TASK_MODAL_ACTION,
} from "../actions/task";

const taskReducer = (state = taskState, action) => {
  const { type, data } = action;
  const { tasks } = state;
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        loading: true,
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        tasks: [...data.tasks],
        loading: false,
        openTaskModal: false,
      };
    case GET_TASKS_FAILURE:
      return {
        ...state,
        error: data,
        loading: false,
      };
    case CREATE_TASK:
      return {
        ...state,
        loading: true,
      };
    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        tasks: [data.tasks],
        loading: false,
        openTaskModal: false,
      };
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        error: data,
        loading: false,
      };
    case TASK_MODAL_ACTION:
      return {
        openTaskModal: data,
      };
    default:
      return { ...state };
  }
};

export { taskReducer };
