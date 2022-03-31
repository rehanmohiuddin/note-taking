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
  FILTER,
  FILTER_BEFORE_TODAY_DEADLINE,
  FILTER_THIS_WEEK,
  FILTER_TODAY_DEADLINE,
  FILTER_THIS_MONTH,
  PRIORITY_LOW_TO_HIGH,
  PRIORITY_HIGH_TO_LOW,
  FARTHEST_DEADLINE,
  NEAREST_DEADLINE,
  PRIORITY_HIGH,
  PRIORITY_LOW,
  PRIORITY_MEDIUM,
  SORT,
} from "../actions/task";

const tasksKanbanReducer = (kanban, task) => ({
  ...kanban,
  [task.section]: [...kanban[task.section], task],
});

const filterMapper = {
  [FILTER_BEFORE_TODAY_DEADLINE]: (tasks) =>
    tasks.filter(
      (_task) => new Date(_task.deadline).getDay() < new Date().getDay()
    ),
  [FILTER_THIS_WEEK]: (tasks) => {
    const remainingDays = 7 - new Date().getDay();
    const today = new Date();
    const lastDateOfWeek = new Date(today);
    lastDateOfWeek.setDate(lastDateOfWeek.getDate() + remainingDays);
    return tasks.filter(
      (_task) => new Date(_task.deadline) <= new Date(lastDateOfWeek)
    );
  },
  [FILTER_TODAY_DEADLINE]: (tasks) =>
    tasks.filter(
      (_task) =>
        new Date(_task.deadline).toDateString() === new Date().toDateString()
    ),
  [FILTER_THIS_MONTH]: (tasks) =>
    tasks.filter(
      (_task) => new Date(_task.deadline).getMonth() === new Date().getMonth()
    ),
};
const sortMapper = {
  [PRIORITY_LOW_TO_HIGH]: (tasks) => [
    ...tasks.filter((_task) => _task.priority === PRIORITY_LOW),
    ...tasks.filter((_task) => _task.priority === PRIORITY_MEDIUM),
    ...tasks.filter((_task) => _task.priority === PRIORITY_HIGH),
  ],
  [PRIORITY_HIGH_TO_LOW]: (tasks) => [
    ...tasks.filter((_task) => _task.priority === PRIORITY_HIGH),
    ...tasks.filter((_task) => _task.priority === PRIORITY_MEDIUM),
    ...tasks.filter((_task) => _task.priority === PRIORITY_LOW),
  ],
  [NEAREST_DEADLINE]: (tasks) =>
    tasks.sort(
      (_task_1, _task_2) =>
        new Date(_task_1.deadline) - new Date(_task_2.deadline)
    ),
  [FARTHEST_DEADLINE]: (tasks) =>
    tasks.sort(
      (_task_1, _task_2) =>
        new Date(_task_2.deadline) - new Date(_task_1.deadline)
    ),
};

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
      // console.log({ _newKanban, data });
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
      const _resultKanban = data.tasks.reduce(tasksKanbanReducer, _kanbanTasks);
      return {
        ...state,
        tasks: [...data.tasks],
        kanban: { ..._resultKanban },
        loading: false,
        openTaskModal: false,
        selectedFilter: null,
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
    case GET_TASK_DETAIL:
      return {
        ...state,
        taskDetail: { ...data },
        openTaskModal: true,
      };
    case FILTER:
      const _filteredTasks = filterMapper[data]([
        ...kanban[TODO],
        ...kanban[IN_PROGRESS],
        ...kanban[COMPLETED],
      ]);
      const filteredKanBan = _filteredTasks.reduce(tasksKanbanReducer, {
        ...kanbanInitial,
      });
      return {
        ...state,
        kanban: { ...filteredKanBan },
        selectedFilter: data,
      };
    case SORT:
      const _sortedTasks = sortMapper[data]([
        ...kanban[TODO],
        ...kanban[IN_PROGRESS],
        ...kanban[COMPLETED],
      ]);
      const sortedKanBan = _sortedTasks.reduce(tasksKanbanReducer, {
        ...kanbanInitial,
      });
      return {
        ...state,
        kanban: { ...sortedKanBan },
        tasks: [..._sortedTasks],
        selectedFilter: data,
      };
    default:
      return { ...state };
  }
};

export { taskReducer };
