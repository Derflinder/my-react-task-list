import React from "react";
import { Link } from "react-router-dom";

const SobreNosotros = () => {
  return (
    <div>
      <h2>Sobre Nosotros</h2>
      <p>
        ¡Bienvenido a nuestra aplicación! Esta es una aplicación que te permite administrar tus tareas diarias. Puedes agregar nuevas tareas con fecha si asi lo deseas, marcarlas como completadas, eliminar tareas y cambiar entre el modo claro y oscuro para una mejor experiencia de usuario.
      </p>
      <p>
        Nuestra aplicación utiliza tecnologías modernas de desarrollo web, incluyendo React para la interfaz de usuario y React Router para el enrutamiento. También utilizamos estilos de Bootstrap para un diseño responsive y atractivo.
      </p>
      <p>
        Esperamos que disfrutes utilizando nuestra aplicación y que te sea útil para organizar tus tareas y mantener un estilo de vida productivo y saludable.
      </p>
      <Link to="/lista-de-tareas" className="cta-button">
          Siguiente
        </Link>
    </div>
  );
};

export default SobreNosotros;
