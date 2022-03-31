import { Response } from "miragejs";
import { requiresAuth } from "../utils/authUtils";
import { getTasks, setTasks } from "../utils/task";

/**
 * All the routes related to Archives are present here.
 *  These are Privately accessible routes.
 * */

/**
 * This handler handles gets all archived notes in the db.
 * send GET Request at /api/archives
 * */

export const getAllArchivedNotesHandler = function (schema, request) {
  return new Response(
    200,
    {},
    { tasks: getTasks().filter((_task) => _task.isArchived) }
  );
};

/**
 * This handler handles deletes note from archive.
 * send DELETE Request at /api/archives/delete/:noteId
 * */

export const deleteFromArchivesHandler = function (schema, request) {
  const user = requiresAuth.call(this, request);
  if (!user) {
    new Response(
      404,
      {},
      {
        errors: ["The email you entered is not Registered. Not Found error"],
      }
    );
  }
  const { noteId } = request.params;
  user.archives = user.archives.filter((note) => note._id !== noteId);
  this.db.users.update({ _id: user._id }, user);
  return new Response(200, {}, { archives: user.archives });
};

/**
 * This handler handles restoring the archived notes to user notes.
 * send POST Request at /api/archives/restore/:noteId
 * */

export const restoreFromArchivesHandler = function (schema, request) {
  const { taskId } = request.params;
  let tasks = getTasks();
  const restoredNoteIndex = tasks.findIndex((task) => task._id === taskId);
  tasks[restoredNoteIndex] = { ...tasks[restoredNoteIndex], isArchived: false };
  setTasks(tasks);
  return new Response(
    200,
    {},
    { tasks: [...tasks.filter((_task) => _task.isArchived)] }
  );
};
