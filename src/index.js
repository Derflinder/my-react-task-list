import { createRoot } from "react-dom/client";
import "./index.css"; // Importa los estilos
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css"; // Importa los estilos de Bootstrap

const container = document.getElementById("root"); // Obtiene el contenedor con el id "root"
const root = createRoot(container); // Crea un root para renderizar de forma concurrente

root.render(<App />); // Renderiza la aplicación dentro del contenedor
