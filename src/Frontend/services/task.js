import {
  ARCHIVE_TASK_FAILURE,
  ARCHIVE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  DELETE_TASK_SUCCESS,
  GET_ARCHIVE_TASK_FAILURE,
  GET_ARCHIVE_TASK_SUCCESS,
  GET_TASKS_FAILURE,
  GET_TASKS_SUCCESS,
  RESTORE_FROM_ARCHIVE_FAILURE,
  RESTORE_FROM_ARCHIVE_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
  GET_TAGS_SUCCESS,
  GET_TAGS_FAILURE,
  SEARCH_TASKS_SUCCESS,
  SEARCH_TASKS_FAILURE,
  DROP_SUCCESS,
  DROP_FAILURE,
} from "../actions/task";
import { AxiosInstance } from "../AxiosInstance";

const getTasks = async () => {
  try {
    const resp = await AxiosInstance.get("/tasks");
    return resp.status === 200
      ? {
          type: GET_TASKS_SUCCESS,
          data: resp.data,
        }
      : {
          type: GET_TASKS_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: GET_TASKS_FAILURE,
      data: e.toString(),
    };
  }
};

const getTags = async () => {
  try {
    const resp = await AxiosInstance.get("/tags");
    return resp.status === 200
      ? {
          type: GET_TAGS_SUCCESS,
          data: resp.data,
        }
      : {
          type: GET_TAGS_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: GET_TAGS_FAILURE,
      data: e.toString(),
    };
  }
};

const createTask = async (payload) => {
  try {
    const resp = await AxiosInstance.post("/tasks", payload);
    return resp.status === 200
      ? {
          type: CREATE_TASK_SUCCESS,
          data: resp.data,
        }
      : {
          type: CREATE_TASK_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: CREATE_TASK_FAILURE,
      data: e.toString(),
    };
  }
};

const archiveTask = async (payload) => {
  try {
    const { _id } = payload;
    const resp = await AxiosInstance.post("/tasks/archives/" + _id, payload);
    return resp.status === 200
      ? {
          type: ARCHIVE_TASK_SUCCESS,
          data: resp.data,
        }
      : {
          type: ARCHIVE_TASK_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: ARCHIVE_TASK_FAILURE,
      data: e.toString(),
    };
  }
};

const updateTask = async (payload) => {
  try {
    const { _id } = payload.task;
    const resp = await AxiosInstance.post("/tasks/" + _id, payload);
    return resp.status === 200
      ? {
          type: UPDATE_TASK_SUCCESS,
          data: resp.data,
        }
      : {
          type: UPDATE_TASK_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: UPDATE_TASK_FAILURE,
      data: e.toString(),
    };
  }
};

const getArchivedTasks = async () => {
  try {
    const resp = await AxiosInstance.get("/archives");
    return resp.status === 200
      ? {
          type: GET_ARCHIVE_TASK_SUCCESS,
          data: resp.data,
        }
      : {
          type: GET_ARCHIVE_TASK_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: GET_ARCHIVE_TASK_FAILURE,
      data: e.toString(),
    };
  }
};

const deleteTask = async (payload) => {
  try {
    const { _id } = payload;
    const resp = await AxiosInstance.delete("/tasks/" + _id, payload);
    return resp.status === 200
      ? {
          type: DELETE_TASK_SUCCESS,
          data: resp.data,
        }
      : {
          type: DELETE_TASK_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: DELETE_TASK_FAILURE,
      data: e.toString(),
    };
  }
};

const unArchiveTask = async (payload) => {
  try {
    const { _id } = payload;
    const resp = await AxiosInstance.post("/archives/restore/" + _id, payload);
    return resp.status === 200
      ? {
          type: RESTORE_FROM_ARCHIVE_SUCCESS,
          data: resp.data,
        }
      : {
          type: RESTORE_FROM_ARCHIVE_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: RESTORE_FROM_ARCHIVE_FAILURE,
      data: e.toString(),
    };
  }
};

const searchTask = async (payload) => {
  try {
    const { query } = payload;
    const resp = await AxiosInstance.get("/search?taskQuery=" + query);
    return resp.status === 200
      ? {
          type: SEARCH_TASKS_SUCCESS,
          data: resp.data,
        }
      : {
          type: SEARCH_TASKS_FAILURE,
          data: resp.data,
        };
  } catch (e) {
    return {
      type: SEARCH_TASKS_FAILURE,
      data: e.toString(),
    };
  }
};

const changeSection = async (payload) => {
  try {
    const { tasks } = payload;
    const resp = await AxiosInstance.post("/change/section", { tasks: tasks });
  } catch (e) {
    return {
      type: DROP_FAILURE,
      data: e.toString(),
    };
  }
};

export {
  getTasks,
  createTask,
  archiveTask,
  updateTask,
  getArchivedTasks,
  deleteTask,
  unArchiveTask,
  getTags,
  searchTask,
  changeSection,
};
