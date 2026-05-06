import { useContext, useState } from "react";
import tareasContext from "../tareasContext";

function TaskForm() {
  const { despachador } = useContext(tareasContext);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const agregar = (e) => {
    e.preventDefault();

    despachador({
      tipo: "AGREGAR_TAREA",
      titulo,
      descripcion
    });

    setTitulo("");
    setDescripcion("");
  };

  return (
    <form onSubmit={agregar} style={styles.form}>
      <input
        placeholder="Título"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Descripción"
        value={descripcion}
        onChange={e => setDescripcion(e.target.value)}
      />

      <button>Agregar</button>
    </form>
  );
}

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  }
};

export default TaskForm;