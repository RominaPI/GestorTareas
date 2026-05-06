import { useEffect, useReducer } from "react";
import tareasContext from "./tareasContext";
import { estadoInicial, tareasReducer } from "./tareasReducer";

import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Filter from "./components/Filter";
import TaskCounter from "./components/TaskCounter";

function App() {

  const [estado, despachador] = useReducer(
    tareasReducer,
    estadoInicial,
    () => {
      const guardado = localStorage.getItem("tareas");
      return guardado ? JSON.parse(guardado) : estadoInicial;
    }
  );

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(estado));
  }, [estado]);

  const tareasFiltradas = estado.tareas.filter(t => {
    if (estado.filtro === "completadas") return t.completada;
    if (estado.filtro === "pendientes") return !t.completada;
    return true;
  });

  return (
    <tareasContext.Provider value={{ estado, despachador, tareasFiltradas }}>
      
      <div style={styles.container}>
        
        <div style={styles.appBox}>
          <h1 style={styles.titulo}>Gestor de Tareas</h1>

          <TaskForm />
          <Filter />
          <TaskCounter />

          <div style={styles.lista}>
            <TaskList />
          </div>
        </div>

      </div>

    </tareasContext.Provider>
  );
}

const styles = {
  container: {
    padding: "20px",
    display: "flex",
    justifyContent: "center"
  },

  appBox: {
    width: "600px",
    minHeight: "650px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  titulo: {
    textAlign: "center",
    marginBottom: "10px",
    fontSize: "24px",
    fontWeight: "bold"
  },

lista: {
  height: "350px",
  overflowY: "auto",
  padding: "5px",
  boxSizing: "border-box",
  width: "100%",
  maxWidth: "100%"
}
};

export default App;