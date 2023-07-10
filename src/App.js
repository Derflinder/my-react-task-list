import { useState, useEffect } from "react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import { TaskTable } from "./components/TaskTable";
import { Container } from "./components/Container";
import useTaskActions from "./Hooks/useTaskActions";


function App() {
  const [userName, setUserName] = useState("Alex");
  const { taskItems, createTask, deleteTask, editTask } = useTaskActions();
  const [showCompleted, setShowCompleted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleTask = (task) => {
    editTask(task.name, { done: !task.done });
  };

  const cleanTasks = () => {
    const completedTasks = taskItems.filter((task) => task.done);
    completedTasks.forEach((task) => {
      deleteTask(task.name);
    });
    setShowCompleted(false);
  };

  return (
    <main className={`vh-100 text-white ${darkMode ? "bg-dark" : "bg-light"}`}>
      <TaskBanner
        userName={userName}
        taskItems={taskItems}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      <Container>
        <TaskCreator createNewTask={createTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setShowCompleted(checked)}
          cleanTasks={cleanTasks}
        />
        {showCompleted && (
          <TaskTable
            tasks={taskItems}
            toggleTask={toggleTask}
            showCompleted={showCompleted}
          />
        )}
      </Container>
      <div className="text-center mt-3">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => setDarkMode(!darkMode)}
        >
          Toggle Dark Mode
        </button>
      </div>
    </main>
  );
}

export default App;
