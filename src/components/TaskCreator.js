import React, { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";


export const TaskCreator = ({ createNewTask }) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDate, setNewTaskDate] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTaskName.trim().length < 3) {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000); // Ocultar la alerta después de 3 segundos
      return;
    }

    createNewTask(newTaskName, newTaskDescription, newTaskDate);
    setNewTaskName("");
    setNewTaskDescription("");
    setNewTaskDate("");
  };

  return (
    <form className="my-2 row" onSubmit={handleSubmit}>
      <div className="col-9">
        <input
          type="text"
          className="form-control"
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          placeholder="Enter a new task..."
          autoFocus
        />
      </div>
      <div className="col-9 mt-2">
        <input
          type="text"
          className="form-control"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Enter a description..."
        />
      </div>
      <div className="col-9 mt-2">
        <input
          type="date"
          className="form-control"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
          placeholder="Select a date..."
        />
      </div>
      <div className="col-3 p-0 d-flex align-items-center">
        <button className="btn btn-primary btn-sm" type="submit">
          Save Task
        </button>
      </div>
      {showAlert && (
        <TransitionGroup className="alert-container">
          <CSSTransition classNames="alert" timeout={300}>
            <div className="alert alert-danger">
              Task name should have at least 3 characters
            </div>
          </CSSTransition>
        </TransitionGroup>
      )}
    </form>
  );
};
