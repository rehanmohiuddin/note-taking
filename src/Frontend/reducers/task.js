import {
  CREATE_TASK,
  CREATE_TASK_FAILURE,
  CREATE_TASK_SUCCESS,
  GET_TASKS,
  GET_TASKS_FAILURE,
  GET_TASKS_SUCCESS,
  taskState,
  TASK_MODAL_ACTION,
  TODO,
  IN_PROGRESS,
  COMPLETED,
  GET_TASK_DETAIL,
  UPDATE_TASK,
  UPDATE_TASK_SUCCESS,
  kanbanInitial,
} from "../actions/task";

const tasksKanbanReducer = (kanban, task) => ({
  ...kanban,
  [task.section]: [...kanban[task.section], task],
});

const taskReducer = (state = taskState, action) => {
  const { type, data } = action;
  const { kanban, tasks } = state;
  switch (type) {
    case GET_TASKS:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TASK:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_TASK_SUCCESS:
      const _taskToBeUpdatedIndex = tasks.findIndex(
        (_task) => _task._id === data.task._id
      );
      const _newTasks = [...tasks];
      _newTasks[_taskToBeUpdatedIndex] = { ...data.task };
      const _newKanban = _newTasks.reduce(tasksKanbanReducer, {
        ...kanbanInitial,
      });
      console.log({ _newKanban, data });
      return {
        ...state,
        tasks: [..._newTasks],
        kanban: { ..._newKanban },
        loading: false,
        openTaskModal: false,
        taskDetail: null,
      };
    case GET_TASKS_SUCCESS:
      const _kanbanTasks = { ...kanban };
      console.log(kanban[data.tasks[0].section]);
      const _resultKanban = data.tasks.reduce(tasksKanbanReducer, _kanbanTasks);
      return {
        ...state,
        tasks: [...data.tasks],
        kanban: { ..._resultKanban },
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
      const newKanban = {
        ...kanban,
        [data.task.section]: [data.task, ...kanban[data.task.section]],
      };
      return {
        ...state,
        tasks: [data.task, ...state.tasks],
        kanban: { ...newKanban },
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
        ...state,
        openTaskModal: data,
        taskDetail: null,
      };
    case GET_TASK_DETAIL: {
      return {
        ...state,
        taskDetail: { ...data },
        openTaskModal: true,
      };
    }
    default:
      return { ...state };
  }
};

export { taskReducer };
