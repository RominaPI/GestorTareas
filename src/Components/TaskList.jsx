import { useContext } from "react";
import tareasContext from "../tareasContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const { tareasFiltradas } = useContext(tareasContext);

  if (tareasFiltradas.length === 0) {
    return (
      <div style={styles.empty}>
        <div style={styles.emptyCircle} />
        <p style={styles.emptyTitle}>sin tareas aquí</p>
        <p style={styles.emptyText}>agrega una tarea o cambia el filtro</p>
      </div>
    );
  }

  return (
    <div style={styles.list}>
      {tareasFiltradas.map((t) => (
        <TaskItem key={t.id} tarea={t} />
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  empty: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "60px 20px",
    border: "1px dashed #fce8f1",
    borderRadius: "16px",
    background: "#fff",
  },
  emptyCircle: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#fce8f1",
    marginBottom: "14px",
  },
  emptyTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#C89AB0",
    margin: "0 0 4px",
  },
  emptyText: {
    fontSize: "13px",
    color: "#D4B8C7",
    margin: 0,
  },
};

export default TaskList;