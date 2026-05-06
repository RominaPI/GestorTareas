import { useContext } from "react";
import tareasContext from "../tareasContext";

function TaskCounter() {
  const { tareasFiltradas } = useContext(tareasContext);

  return <p>Total: {tareasFiltradas.length}</p>;
}

export default TaskCounter;