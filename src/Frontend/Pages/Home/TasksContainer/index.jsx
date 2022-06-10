import React, { useMemo, useState } from "react";
import { useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import {
  DROP_SUCCESS,
  GET_TASKS,
  GET_TASKS_SUCCESS,
} from "../../../actions/task";
import Kanban from "../../../Components/Kanban";
import Loader from "../../../Components/Loader";
import { useTask } from "../../../context/Task";
import { changeSection, getTasks } from "../../../services/task";
import { dropAction } from "./DropActions";
import "./index.css";

function Index() {
  const { loading, dispatch, kanban } = useTask();
  useEffect(async () => {
    dispatch({ type: GET_TASKS });
    dispatch({ ...(await getTasks()) });
  }, []);

  const kanbanObj = useMemo(() => {
    const _kanBanObj = {};
    Object.keys(kanban).forEach((key) => {
      _kanBanObj[kanban[key]._id] = {
        ...kanban[key],
      };
    });
    return { ..._kanBanObj };
  }, [kanban]);

  const tasks = useMemo(() => {
    let _tasks = [];
    Object.keys(kanban).forEach((key) => {
      _tasks = [..._tasks, ...kanban[key].tasks];
    });
    return _tasks;
  }, [kanban]);

  console.log({ tasks });

  const onDragEnd = async (draggedElement, y) => {
    const { destination, draggableId, source, type } = draggedElement;
    if (source.droppableId !== destination.droppableId) {
      const result = dropAction.dropTaskToKanban(
        kanbanObj[source.droppableId],
        kanbanObj[destination.droppableId],
        draggableId,
        destination.index,
        source.index
      );
      dispatch({
        type: DROP_SUCCESS,
        data: { ...kanban, ...result },
      });
      await changeSection({ tasks: tasks });
    } else if (source.droppableId === destination.droppableId) {
      const result = dropAction.dropOnSameKanban(
        kanbanObj[source.droppableId],
        source.index,
        destination.index
      );
      kanban[result.name] = result;
      dispatch({
        type: DROP_SUCCESS,
        data: { ...kanban },
      });
    }
  };

  return (
    <div className="kanban-container">
      {loading ? (
        <Loader />
      ) : (
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.keys(kanban).map((_kanban, index) => {
            const { name = "", _id = "", tasks = [] } = kanban[_kanban] ?? {};
            return <Kanban index={index} name={name} tasks={tasks} _id={_id} />;
          })}
        </DragDropContext>
      )}
    </div>
  );
}

export default Index;
