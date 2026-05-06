import { useContext } from "react";
import tareasContext from "../tareasContext";
import TaskItem from "./TaskItem";

function TaskList() {
  const { tareasFiltradas } = useContext(tareasContext);

  return (
    <>
      {tareasFiltradas.map(t => (
        <TaskItem key={t.id} tarea={t} />
      ))}
    </>
  );
}

export default TaskList;