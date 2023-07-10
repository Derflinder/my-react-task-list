import { useState, useEffect } from "react";

const useTaskActions = () => {
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  const createTask = (taskName, taskDescription, taskDate) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems((prevTaskItems) => [
        ...prevTaskItems,
        { name: taskName, description: taskDescription, date: taskDate, done: false },
      ]);
    }
  };

  const deleteTask = (taskName) => {
    setTaskItems((prevTaskItems) =>
      prevTaskItems.filter((task) => task.name !== taskName)
    );
  };

  const editTask = (taskName, updatedTask) => {
    setTaskItems((prevTaskItems) =>
      prevTaskItems.map((task) =>
        task.name === taskName ? { ...task, ...updatedTask } : task
      )
    );
  };

  return { taskItems, createTask, deleteTask, editTask };
};

export default useTaskActions;
