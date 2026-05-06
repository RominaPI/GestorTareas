import { useContext } from "react";
import tareasContext from "../tareasContext";

function Filter() {
  const { despachador } = useContext(tareasContext);

  return (
    <select onChange={(e) =>
      despachador({ tipo: "CAMBIAR_FILTRO", filtro: e.target.value })
    }>
      <option value="todas">Todas</option>
      <option value="completadas">Completadas</option>
      <option value="pendientes">Pendientes</option>
    </select>
  );
}

export default Filter;