import { useContext } from "react";
import tareasContext from "../tareasContext";

function Filter() {
  const { estado, despachador } = useContext(tareasContext);

  return (
    <select
      style={styles.select}
      value={estado.filtro}
      onChange={(e) =>
        despachador({ tipo: "CAMBIAR_FILTRO", filtro: e.target.value })
      }
    >
      <option value="todas">todas las tareas</option>
      <option value="pendientes">pendientes</option>
      <option value="completadas">completadas</option>
    </select>
  );
}

const styles = {
  select: {
    width: "100%",
    border: "1px solid #fce8f1",
    borderRadius: "10px",
    padding: "10px 12px",
    fontSize: "13px",
    color: "#2a1420",
    background: "#FDF6F9",
    appearance: "auto",
  },
};

export default Filter;