import { useContext } from "react";
import tareasContext from "../tareasContext";

function TaskCounter() {
  const { estado, tareasFiltradas } = useContext(tareasContext);

  const total = estado.tareas.length;
  const completadas = estado.tareas.filter((t) => t.completada).length;
  const pendientes = estado.tareas.filter((t) => !t.completada).length;

  return (
    <div style={styles.container}>
      <p style={styles.label}>resumen</p>
      <div style={styles.chips}>
        <div style={styles.chip}>
          <span style={styles.num}>{total}</span>
          <span style={styles.chipLabel}>total</span>
        </div>
        <div style={{ ...styles.chip, ...styles.chipPink }}>
          <span style={{ ...styles.num, color: "#E8649A" }}>{pendientes}</span>
          <span style={styles.chipLabel}>pendientes</span>
        </div>
        <div style={{ ...styles.chip, ...styles.chipGreen }}>
          <span style={{ ...styles.num, color: "#1D9E75" }}>{completadas}</span>
          <span style={styles.chipLabel}>listas</span>
        </div>
      </div>
      {estado.filtro !== "todas" && (
        <p style={styles.filteredNote}>
          mostrando {tareasFiltradas.length} tarea{tareasFiltradas.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

const styles = {
  container: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #fce8f1",
    padding: "16px 18px",
  },
  label: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#C89AB0",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    margin: "0 0 12px",
  },
  chips: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
  },
  chip: {
    background: "#FDF6F9",
    borderRadius: "10px",
    padding: "10px 8px",
    textAlign: "center",
    border: "1px solid #fce8f1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px",
  },
  chipPink: {
    background: "#fff0f6",
    borderColor: "#fce8f1",
  },
  chipGreen: {
    background: "#f0faf6",
    borderColor: "#c5eadb",
  },
  num: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2a1420",
    lineHeight: 1,
  },
  chipLabel: {
    fontSize: "10px",
    color: "#C89AB0",
    marginTop: "2px",
  },
  filteredNote: {
    fontSize: "11px",
    color: "#E8649A",
    textAlign: "center",
    marginTop: "10px",
    fontWeight: "500",
  },
};

export default TaskCounter;