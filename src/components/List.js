import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { useGlobalContext } from "../context";
import Task from "./Task";

const List = () => {
  const { tasks, filter } = useGlobalContext();

  let filtred = [...tasks];

  switch (filter) {
    case "all":
      filtred = [...tasks];
      break;

    case "completed":
      filtred = tasks.filter((task) => task.completed);
      break;

    case "uncompleted":
      filtred = tasks.filter((task) => !task.completed);
      break;

    default:
      filtred = [...tasks];
      break;
  }

  const priorityOrder = {
    red: 1,
    yellow: 2,
    green: 3,
  };

  filtred.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }

    return new Date(a.deadline) - new Date(b.deadline);
  });

  return (
    <Droppable droppableId="droppable-1">
      {(provided) => (
        <ul
          className="tasks-wrapper"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {filtred.map((task, i) => (
            <Task key={task.id} {...task} index={i} />
          ))}

          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default List;