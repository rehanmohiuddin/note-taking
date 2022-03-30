import {
  ARCHIVE_TASK_FAILURE,
  ARCHIVE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  CREATE_TASK_SUCCESS,
  GET_TASKS_FAILURE,
  GET_TASKS_SUCCESS,
  UPDATE_TASK_FAILURE,
  UPDATE_TASK_SUCCESS,
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

const createTask = async (payload) => {
  try {
    const resp = await AxiosInstance.post("/tasks", payload);
    console.log({ resp });
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
    console.log({ e });
    return {
      type: CREATE_TASK_FAILURE,
      data: e.toString(),
    };
  }
};

const archiveTask = async (payload) => {
  try {
    const resp = await AxiosInstance.post("/tasks/archives", payload, {
      params: {
        taskId: payload.taskId,
      },
    });
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

export { getTasks, createTask, archiveTask, updateTask };
