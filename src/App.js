import { useState, useEffect } from "react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import { TaskTable } from "./components/TaskTable";
import { Container } from "./components/Container";

function App() {
  const [userName, setUserName] = useState("Alex");
  const [taskItems, setTaskItems] = useState([]);
  const [showCompleted, setshowCompleted] = useState(false);

  useEffect(() => {
    let data = localStorage.getItem("tasks");
    if (data) {
      setTaskItems(JSON.parse(data));
    }
    setUserName("Alex");
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskItems));
  }, [taskItems]);

  const createNewTask = (taskName, taskDescription, taskDate) => {
    if (!taskItems.find((t) => t.name === taskName)) {
      setTaskItems([
        ...taskItems,
        { name: taskName, description: taskDescription, date: taskDate, done: false }
      ]);
    }
  };
  

  const toggleTask = (task) =>
    setTaskItems(
      taskItems.map((t) => (t.name === task.name ? { ...t, done: !t.done } : t))
    );

  const cleanTasks = () => {
    setTaskItems(taskItems.filter((task) => !task.done));
    setshowCompleted(false);
  };

  const [darkMode, setDarkMode] = useState(false);


  return (
    <main className={`vh-100 text-white ${darkMode ? "bg-dark" : "bg-light"}`}>
      <TaskBanner userName={userName} taskItems={taskItems} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Container>
        <TaskCreator createNewTask={createNewTask} />
        <TaskTable tasks={taskItems} toggleTask={toggleTask} />
        <VisibilityControl
          description="Completed Tasks"
          isChecked={showCompleted}
          callback={(checked) => setshowCompleted(checked)}
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
        <button className="btn btn-sm btn-secondary" onClick={() => setDarkMode(!darkMode)}>
          Toggle Dark Mode
        </button>
      </div>
    </main>
  );
  
}

export default App;