import app from "./app.js";
import "./database.js";
import dotenv from "dotenv";

dotenv.config();

import { config } from "./src/config.js";

// Función principal para iniciar el servidor
function main() {
  const port = config.server.PORT || 4000;
  try {
    app.listen(port, () => {
      console.log("Server on port", port);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

// Ejecuta la función principal
main();
