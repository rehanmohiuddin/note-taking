const dropTaskToKanban = (
  sourceKanban,
  targetKanban,
  draggableId,
  destIndex,
  sourceIndex
) => {
  const newDestTasks = [...targetKanban.tasks];
  sourceKanban.tasks[sourceIndex].section = targetKanban.name;
  newDestTasks.splice(destIndex, 0, sourceKanban.tasks[sourceIndex]);
  return {
    [sourceKanban.name]: {
      ...sourceKanban,
      tasks: sourceKanban.tasks.filter(({ _id }) => _id !== draggableId),
    },
    [targetKanban.name]: {
      ...targetKanban,
      tasks:
        targetKanban.tasks.length > 0
          ? newDestTasks
          : [sourceKanban.tasks[sourceIndex]],
    },
  };
};

const dropOnSameKanban = (kanban, sourceIndex, destIndex) => {
  const sw = kanban.tasks[sourceIndex];
  kanban.tasks[sourceIndex] = kanban.tasks[destIndex];
  kanban.tasks[destIndex] = sw;

  return kanban;
};

const dropAction = {
  dropTaskToKanban: dropTaskToKanban,
  dropOnSameKanban: dropOnSameKanban,
};

export { dropAction };
