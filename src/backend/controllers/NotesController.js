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
  return new Response(200, {}, { tasks: tasks });
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
    if (!task.tags) {
      tasks.push({
        ...task,
        _id: uuid(),
        tags: [],
        created_at: new Date().toISOString(),
        section: "TODO",
      });
    } else {
      tasks.push({
        ...task,
        _id: uuid(),
        created_at: new Date().toISOString(),
        section: "TODO",
      });
    }
    setTasks(tasks);
    return new Response(200, {}, { tasks: tasks });
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
    const noteId = request.params.noteId;
    const tasks = getTasks();
    const _filteredTasks = tasks.filter((item) => item._id !== noteId);
    setTasks(_filteredTasks);
    return new Response(200, {}, { tasks: _filteredTasks });
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
    return new Response(200, {}, { tasks: tasks });
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

export const archiveNoteHandler = function (schema, request) {
  try {
    const { taskId } = request.params;
    let tasks = getTasks();
    const archivedNote = tasks.filter((task) => task._id === taskId)[0];
    tasks = tasks.filter((task) => task._id !== taskId);
    tasks.push({ ...archivedNote });
    setTasks(tasks);
    return new Response(200, {}, { tasks: tasks });
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
