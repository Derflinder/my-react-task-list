import React from "react";
import "./Home.css"; // Importamos un archivo CSS para estilizar el componente Home
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-container">
      <div className="welcome-message">
        <h1>Bienvenido a Mi Aplicación Increíble</h1>
        <p>¡Hola Usuario! Estás a punto de vivir una experiencia única.</p>
        <p>Con nuestra aplicación podrás organizar tus tareas, mejorar tu productividad y alcanzar tus metas.</p>
        <Link to="/sobre-nosotros" className="cta-button">
          Comenzar
        </Link>
      </div>
    </div>
  );
}

export default Home;