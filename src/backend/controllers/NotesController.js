import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { v4 as uuid } from "uuid";
import { getTasks, setTasks } from "../utils/task";
/**
 * All the routes related to Notes are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all notes in the db.
 * send GET Request at /api/notes
 * */

export const getAllNotesHandler = function (schema, request) {
  const tasks = getTasks() ? getTasks() : [];
  return new Response(
    200,
    {},
    { tasks: tasks.filter((_task) => !_task.isArchived) }
  );
};

/**
 * This handler handles creating a new note
 * send POST Request at /api/notes
 * body contains {note}
 * */

export const createNoteHandler = function (schema, request) {
  try {
    const { task } = JSON.parse(request.requestBody);
    const tasks = getTasks() ? getTasks() : [];
    const createdTask = {
      ...task,
      _id: uuid(),
      created_at: new Date().toISOString(),
      section: "TODO",
      isArchived: false,
    };
    if (!task.tags) {
      tasks.push({
        ...createdTask,
      });
    } else {
      tasks.push({
        ...createdTask,
      });
    }
    setTasks(tasks);
    return new Response(200, {}, { task: createdTask });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles creating a new note
 * send DELETE Request at /api/notes/:noteId
 * */

export const deleteNoteHandler = function (schema, request) {
  try {
    const taskId = request.params.taskId;
    const tasks = getTasks();
    const _filteredTasks = tasks.filter((item) => item._id !== taskId);
    setTasks(_filteredTasks);
    return new Response(200, {}, { task: { _id: taskId } });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles updating a note
 * send POST Request at /api/notes/:noteId
 * body contains {note}
 * */

export const updateNoteHandler = function (schema, request) {
  try {
    const { task } = JSON.parse(request.requestBody);
    const { taskId } = request.params;
    let tasks = getTasks();
    const taskIndex = tasks.findIndex((task) => task._id === taskId);
    tasks[taskIndex] = { ...tasks[taskIndex], ...task };
    setTasks(tasks);
    return new Response(200, {}, { task: tasks[taskIndex] });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles archiving a note
 * send POST Request at /api/notes/archive/:noteId
 * body contains {note}
 * */

export const getTags = function (schema, request) {
  try {
    let tasks = getTasks();
    const tagsReducer = (taskTags, task) => [...taskTags, ...task.tags];
    const tags = tasks.reduce(tagsReducer, []);
    return new Response(200, {}, { tags: [...tags] });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const archiveNoteHandler = function (schema, request) {
  try {
    const { task } = JSON.parse(request.requestBody);
    const { taskId } = request.params;
    let tasks = getTasks();
    const taskIndex = tasks.findIndex((task) => task._id === taskId);
    tasks[taskIndex] = { ...tasks[taskIndex], ...task, isArchived: true };
    setTasks(tasks);
    return new Response(
      200,
      {},
      { tasks: tasks.filter((_task) => !_task.isArchived) }
    );
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

export const searchTasksHandler = function (schema, request) {
  try {
    const { taskQuery } = request.queryParams;
    const tasks = getTasks();
    const searchResults = tasks.filter(({ title }) =>
      title.toLowerCase().includes(taskQuery)
    );
    return new Response(200, {}, { tasks: searchResults });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
