import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";
import List from "../components/List";
import Alert from "../components/Alert";
import { useGlobalContext } from "../context";
import Colors from "../components/Colors";

const Home = () => {
  const {
    inputRef,
    tasks,
    setTasks,
    alert,
    showAlert,
    isEditing,
    setIsEditing,
    editId,
    setEditId,
    name,
    setName,
    filter,
    setFilter,
    isColorsOpen,
    setIsColorsOpen,
  } = useGlobalContext();

  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("");

  const addTask = (e) => {
    e.preventDefault();

    if (!name || !priority) {
      showAlert(true, "nome ou prioridade invalida");
    } else if (name && isEditing) {
      setTasks(
        tasks.map((task) =>
          task.id === editId
            ? {
              ...task,
              name,
              deadline,
              priority,
            }
            : task
        )
      );

      setIsEditing(false);
      setEditId(null);
      setName("");
      setDeadline("");
      setPriority("");

      showAlert(true, "Task Edited.");
    } else {
      const newTask = {
        id: uuid().slice(0, 8),
        name,
        completed: false,
        color: "#009688",
        deadline,
        priority,
      };

      setTasks([...tasks, newTask]);

      showAlert(true, "Task Added.");

      setName("");
      setDeadline("");
      setPriority("");
    }
  };

  const filterTasks = (e) => {
    setFilter(e.target.dataset["filter"]);
  };

  const deleteAll = () => {
    setTasks([]);
    showAlert(true, "Your list is clear!");
  };

  useEffect(() => {
    inputRef.current.focus();
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [inputRef, tasks]);

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;

    if (desI !== undefined) {
      const reOrdered = [...tasks];

      reOrdered.splice(desI, 0, reOrdered.splice(srcI, 1)[0]);

      setTasks(reOrdered);
    }
  };

  const hideColorsContainer = (e) => {
    if (e.target.classList.contains("btn-colors")) return;
    setIsColorsOpen(false);
  };

  return (
    <>
      <div className="container" onClick={hideColorsContainer}>
        {isColorsOpen && <Colors />}
        {alert && <Alert msg={alert.msg} />}

        <form className="head" onSubmit={addTask}>
          <input
            type="text"
            ref={inputRef}
            placeholder="New Task"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled>
              Selecione a prioridade
            </option>
            <option value="green">Baixa</option>
            <option value="yellow">Média</option>
            <option value="red">Alta</option>
          </select>

          <button type="submit">
            {isEditing ? "Edit" : "Add"}
          </button>
        </form>

        <div className="filter">
          <button data-filter="all" onClick={filterTasks}>
            All
          </button>

          <button data-filter="completed" onClick={filterTasks}>
            Completed
          </button>

          <button data-filter="uncompleted" onClick={filterTasks}>
            Uncompleted
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          {tasks.length > 0 ? <List /> : <p>Your list is clear!</p>}
        </DragDropContext>

        {tasks.length > 2 && (
          <button
            className="btn-delete-all"
            onClick={deleteAll}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="footer">
        <a
          href="https://github.com/anna-hub19"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub className="github" />
        </a>
      </div>
    </>
  );
};

export default Home;