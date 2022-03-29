import React from "react";
import { TaskProvider } from "./Task";

function index({ children }) {
  return <TaskProvider>{children}</TaskProvider>;
}

export default index;
