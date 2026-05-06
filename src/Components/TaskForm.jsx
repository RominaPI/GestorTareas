import { useContext, useState } from "react";
import tareasContext from "../tareasContext";

function TaskForm() {
  const { despachador } = useContext(tareasContext);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregar = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return;
    despachador({ tipo: "AGREGAR_TAREA", titulo, descripcion });
    setTitulo("");
    setDescripcion("");
  };

  return (
    <form onSubmit={agregar} style={styles.form}>
      <p style={styles.label}>nueva tarea</p>

      <input
        style={styles.input}
        placeholder="Título..."
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />

      <textarea
        style={styles.textarea}
        placeholder="Descripción..."
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />

      <button style={styles.boton} type="submit">
        + agregar tarea
      </button>
    </form>
  );
}

const styles = {
  form: {
    background: "#fff",
    borderRadius: "16px",
    border: "1px solid #fce8f1",
    padding: "16px 18px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "10px",
    fontWeight: "600",
    color: "#C89AB0",
    letterSpacing: "0.6px",
    textTransform: "uppercase",
    margin: 0,
  },
  input: {
    border: "1px solid #fce8f1",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "14px",
    color: "#2a1420",
    background: "#FDF6F9",
    width: "100%",
  },
  textarea: {
    border: "1px solid #fce8f1",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "14px",
    color: "#2a1420",
    background: "#FDF6F9",
    resize: "vertical",
    minHeight: "80px",
    width: "100%",
    fontFamily: "inherit",
    lineHeight: "1.5",
  },
  boton: {
    background: "#E8649A",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "11px",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    transition: "opacity 0.2s",
  },
};

export default TaskForm;