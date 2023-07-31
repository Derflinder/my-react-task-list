import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import { TaskTable } from "./components/TaskTable";
import { Container } from "./components/Container";
import useTaskActions from "./Hooks/useTaskActions";
import Home from "./components/Home";
import SobreNosotros from "./components/SobreNosotros"; // Importamos el componente SobreNosotros
import "./App.css"; // Importamos el archivo CSS para los estilos globales
import VideoBackground from "./components/VideoBackground";


function App() {
  const [userName] = useState("Alex");
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

  useEffect(() => {
    // Agregar o quitar la clase 'dark-mode' del elemento 'body' cuando cambie el modo oscuro
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <Router>
        <VideoBackground videoSrc="/videos/fondo.mp4" />
        <main className="vh-100">
        <TaskBanner
          userName={userName}
          taskItems={taskItems}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
        <Container>
          <Routes>
            {/* Ruta para el componente Home */}
            <Route path="/" element={<Home />} />

            {/* Ruta para mostrar la lista de tareas */}
            <Route
              path="/lista-de-tareas"
              element={
                <>
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
                </>
              }
            />

            {/* Ruta para mostrar la página Sobre Nosotros */}
            <Route path="/sobre-nosotros" element={<SobreNosotros />} />
          </Routes>
        </Container>
        <div className="text-center mt-3">
          {/* Link para navegar a la lista de tareas */}
          <Link to="/lista-de-tareas" className="cta-button btn-primary">
            ¡A Organizar Tareas!
          </Link>

          {/* Link para navegar a la página Sobre Nosotros */}
          <Link to="/sobre-nosotros" className="cta-button btn-info ml-2">
            ¿Quiénes Somos?
          </Link>

          {/* Botón para volver al componente Home */}
          <Link to="/" className="cta-button btn-success ml-2">
            Regresar al Inicio
          </Link>
        </div>
        <div className="text-center mt-3">
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => setDarkMode(!darkMode)}
          >
            Cambiar Modo Oscuro
          </button>
        </div>
      </main>
    </Router>
  );
}

export default App;
