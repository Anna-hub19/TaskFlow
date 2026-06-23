import React from "react";
import { Draggable } from "react-beautiful-dnd";
import {
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdDeleteOutline,
  MdOutlineColorLens,
} from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { useGlobalContext } from "../context";

const Task = ({
  id,
  name,
  completed,
  color,
  index,
  deadline,
  priority,
}) => {
  const { removeTask, toggleDone, editTask } =
    useGlobalContext();

  const priorityColors = {
    green: "#4caf50",
    yellow: "#ffc107",
    red: "#f44336",
  };

  return (
    <Draggable key={id} draggableId={"draggable-" + id} index={index}>
      {(provided, snapshot) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            boxShadow: snapshot.isDragging ? "0 0 5rem #666" : "none",
            opacity: snapshot.isDragging
              ? "1"
              : provided.draggableProps.style.opacity,

            backgroundColor: priorityColors[priority] || "#6bcB77",
          }}
          className={`task ${completed && "task-done"}`}
        >
          <div className="task-info">
            <p>{name}</p>

            <small>
              Concluir até: {deadline || "Sem data"}
            </small>

            <small>
              Prioridade:
              {" "}
              {priority === "green" && "Baixa"}
              {priority === "yellow" && "Média"}
              {priority === "red" && "Alta"}
            </small>
          </div>

          <button onClick={() => toggleDone(id)}>
            {completed ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          </button>

          <button onClick={() => removeTask(id)}>
            <MdDeleteOutline />
          </button>

          <button onClick={() => editTask(id)}>
            <FiEdit />
          </button>
        </li>
      )}
    </Draggable>
  );
};

export default Task;