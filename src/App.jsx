import { useEffect, useReducer, useState } from "react";
import tareasContext from "./tareasContext";
import { estadoInicial, tareasReducer } from "./tareasReducer";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Filter from "./Components/Filter";
import TaskCounter from "./Components/TaskCounter";

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

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 720);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const tareasFiltradas = estado.tareas.filter((t) => {
    if (estado.filtro === "completadas") return t.completada;
    if (estado.filtro === "pendientes") return !t.completada;
    return true;
  });

  return (
    <tareasContext.Provider value={{ estado, despachador, tareasFiltradas }}>
      <div style={styles.page}>

        <header style={styles.header}>
          <div style={styles.headerInner}>
            <div style={styles.headerDot} />
            <h1 style={styles.headerTitle}>Gestor de Tareas</h1>
            <p style={styles.headerDate}>
              {new Date().toLocaleDateString("es-MX", {
                weekday: "long", day: "numeric", month: "long", year: "numeric"
              })}
            </p>
          </div>
        </header>

        <main style={{ ...styles.main, gridTemplateColumns: isMobile ? "1fr" : "300px 1fr" }}>

          <div style={{ ...styles.sidebar, position: isMobile ? "static" : "sticky" }}>
            <TaskForm />
            <div style={styles.filterCard}>
              <p style={styles.cardLabel}>filtrar por estado</p>
              <Filter />
            </div>
            <TaskCounter />
          </div>

          <div style={styles.content}>
            <p style={styles.sectionTitle}>
              {estado.filtro === "todas"
                ? "todas las tareas"
                : estado.filtro === "completadas"
                ? "tareas completadas"
                : "tareas pendientes"}
            </p>
            <TaskList />
          </div>

        </main>
      </div>
    </tareasContext.Provider>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "#FDF6F9",
  },
  header: {
    background: "#E8649A",
    padding: "0 24px",
  },
  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "28px 0 24px",
    position: "relative",
  },
  headerDot: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    marginBottom: "12px",
  },
  headerTitle: {
    fontSize: "clamp(24px, 4vw, 36px)",
    fontWeight: "700",
    color: "#fff",
    letterSpacing: "-0.5px",
    marginBottom: "6px",
  },
  headerDate: {
    fontSize: "13px",
    color: "rgba(255,255,255,0.75)",
    textTransform: "capitalize",
  },
  main: {
    flex: 1,
    maxWidth: "1100px",
    margin: "0 auto",
    width: "100%",
    padding: "28px 24px",
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "24px",
    alignItems: "start",
  },
  sidebar: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "sticky",
    top: "24px",
  },
  filterCard: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #fce8f1",
    padding: "16px 18px",
  },
  cardLabel: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#C89AB0",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
  },
  sectionTitle: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#C89AB0",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    paddingBottom: "4px",
    borderBottom: "1px solid #fce8f1",
  },
};

export default App;