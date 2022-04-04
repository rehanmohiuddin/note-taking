import { Server, Model, RestSerializer } from "miragejs";
import {
  deleteFromArchivesHandler,
  getAllArchivedNotesHandler,
  restoreFromArchivesHandler,
} from "./backend/controllers/ArchiveController";
import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  archiveNoteHandler,
  createNoteHandler,
  deleteNoteHandler,
  getAllNotesHandler,
  getTags,
  updateNoteHandler,
} from "./backend/controllers/NotesController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  const server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      user: Model,
      notes: Model,
    },

    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          notes: [],
          archives: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.timing = 1500;
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // notes routes (private)
      this.get("/tasks", getAllNotesHandler.bind(this));
      this.post("/tasks", createNoteHandler.bind(this));
      this.post("/tasks/:taskId", updateNoteHandler.bind(this));
      this.delete("/tasks/:taskId", deleteNoteHandler.bind(this));
      this.post("/tasks/archives/:taskId", archiveNoteHandler.bind(this));
      this.get("/tags", getTags.bind(this));
      // archive routes (private)
      this.get("/archives", getAllArchivedNotesHandler.bind(this));
      this.post(
        "/archives/restore/:taskId",
        restoreFromArchivesHandler.bind(this)
      );
      this.delete(
        "/archives/delete/:noteId",
        deleteFromArchivesHandler.bind(this)
      );
    },
  });
  return server;
}
