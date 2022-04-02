const getTasks = () => JSON.parse(localStorage.getItem("tasks"));
const setTasks = (tasks) =>
  localStorage.setItem("tasks", JSON.stringify(tasks));

export { getTasks, setTasks };
