import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ChakraProvider, Container, Flex, Box, Text, Button } from "@chakra-ui/react";
import { TaskBanner } from "./components/TaskBanner";
import { TaskCreator } from "./components/TaskCreator";
import { VisibilityControl } from "./components/VisibilityControl";
import { TaskTable } from "./components/TaskTable";
import useTaskActions from "./Hooks/useTaskActions";
import Home from "./components/Home";
import SobreNosotros from "./components/SobreNosotros";
import VideoBackground from "./components/VideoBackground";
import "./App.css";

function Footer() {
  return (
    <Box as="footer" py={1} px={1} bg="gray.800" color="white" textAlign="center">
      <Text>
        Alex Andrius Peña Osorio
      </Text>
    </Box>
  );
}

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
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <ChakraProvider>
      <Router>
        <VideoBackground videoSrc="/videos/fondo.mp4" />
        <main className="vh-100">
          <Flex justifyContent="space-between" alignItems="center" py={4} px={80} bg="gray.800" color="white">
            {/* Logo o título de la aplicación */}
            <Link to="/" className="logo">Alex Tasks</Link>

            {/* Enlaces de navegación */}
            <Flex as="nav" align="center">
              <Link to="/lista-de-tareas" style={{ marginRight: "10px" }}>
                ¡A Organizar Tareas!
              </Link>
              <Link to="/sobre-nosotros" style={{ marginRight: "10px" }}>
                ¿Quiénes Somos?
              </Link>
              <Link to="/" style={{ marginRight: "10px" }}>
                Regresar al Inicio
              </Link>
            </Flex>
          </Flex>

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
            <Button
              size="sm"
              colorScheme="green"
              onClick={() => setDarkMode(!darkMode)}
            >
              Cambiar Modo Oscuro
            </Button>
          </div>
        </main>
        <Footer />
      </Router>
    </ChakraProvider>
  );
}

export default App;
