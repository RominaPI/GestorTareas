import { useContext, useState } from "react";
import tareasContext from "../tareasContext";

function TaskItem({ tarea }) {
  const { despachador } = useContext(tareasContext);
  const [editando, setEditando] = useState(false);
  const [titulo, setTitulo] = useState(tarea.titulo);
  const [descripcion, setDescripcion] = useState(tarea.descripcion);

  const guardar = () => {
    if (!titulo.trim()) return;
    despachador({ tipo: "EDITAR_TAREA", id: tarea.id, titulo, descripcion });
    setEditando(false);
  };

  const cancelar = () => {
    setTitulo(tarea.titulo);
    setDescripcion(tarea.descripcion);
    setEditando(false);
  };

  return (
    <div style={tarea.completada ? styles.cardDone : styles.card}>

      <div style={styles.left}>
        <button
          style={tarea.completada ? styles.checkDone : styles.check}
          onClick={() => despachador({ tipo: "TOGGLE_TAREA", id: tarea.id })}
          title={tarea.completada ? "Marcar como pendiente" : "Marcar como completada"}
        >
          {tarea.completada && <span style={styles.checkMark} />}
        </button>
      </div>

      <div style={styles.body}>
        {editando ? (
          <>
            <input
              style={styles.editInput}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              autoFocus
            />
            <textarea
              style={styles.editTextarea}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <div style={styles.editBtns}>
              <button style={styles.btnGuardar} onClick={guardar}>guardar</button>
              <button style={styles.btnCancelar} onClick={cancelar}>cancelar</button>
            </div>
          </>
        ) : (
          <>
            <div style={styles.badgeRow}>
              <span style={tarea.completada ? styles.badgeDone : styles.badgePend}>
                {tarea.completada ? "completada" : "pendiente"}
              </span>
            </div>
            <p style={tarea.completada ? styles.tituloDone : styles.titulo}>
              {tarea.titulo}
            </p>
            {tarea.descripcion ? (
              <p style={styles.desc}>{tarea.descripcion}</p>
            ) : null}
          </>
        )}
      </div>

      {!editando && (
        <div style={styles.actions}>
          <button
            style={styles.btnToggle}
            onClick={() => despachador({ tipo: "TOGGLE_TAREA", id: tarea.id })}
          >
            {tarea.completada ? "↩ pendiente" : "✓ listo"}
          </button>
          <button style={styles.btnEdit} onClick={() => setEditando(true)}>
            editar
          </button>
          <button
            style={styles.btnDel}
            onClick={() => despachador({ tipo: "ELIMINAR_TAREA", id: tarea.id })}
          >
            × borrar
          </button>
        </div>
      )}
    </div>
  );
}

const baseCard = {
  background: "#fff",
  borderRadius: "14px",
  border: "1px solid #fce8f1",
  padding: "14px 16px",
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  borderLeft: "3px solid #F2AECB",
};

const styles = {
  card: { ...baseCard },
  cardDone: {
    ...baseCard,
    borderLeft: "3px solid #1D9E75",
    opacity: 0.7,
    background: "#fcfcfc",
  },
  left: {
    flexShrink: 0,
    paddingTop: "2px",
  },
  check: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1.5px solid #F2AECB",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  checkDone: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "1.5px solid #1D9E75",
    background: "#1D9E75",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    flexShrink: 0,
  },
  checkMark: {
    display: "block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#fff",
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  badgeRow: {
    marginBottom: "4px",
  },
  badgePend: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "600",
    padding: "2px 8px",
    borderRadius: "20px",
    background: "#fce8f1",
    color: "#C89AB0",
    letterSpacing: "0.3px",
  },
  badgeDone: {
    display: "inline-block",
    fontSize: "10px",
    fontWeight: "600",
    padding: "2px 8px",
    borderRadius: "20px",
    background: "#E1F5EE",
    color: "#0F6E56",
    letterSpacing: "0.3px",
  },
  titulo: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#2a1420",
    margin: "0 0 3px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  tituloDone: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#C89AB0",
    margin: "0 0 3px",
    textDecoration: "line-through",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  desc: {
    fontSize: "12px",
    color: "#C89AB0",
    margin: 0,
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    lineHeight: "1.5",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flexShrink: 0,
  },
  btnToggle: {
    fontSize: "10px",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #E8649A",
    background: "transparent",
    color: "#E8649A",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  btnEdit: {
    fontSize: "10px",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #fce8f1",
    background: "transparent",
    color: "#C89AB0",
    whiteSpace: "nowrap",
  },
  btnDel: {
    fontSize: "10px",
    padding: "4px 10px",
    borderRadius: "20px",
    border: "1px solid #F5C4C4",
    background: "transparent",
    color: "#D4537E",
    whiteSpace: "nowrap",
  },
  editInput: {
    width: "100%",
    border: "1px solid #fce8f1",
    borderRadius: "8px",
    padding: "7px 10px",
    fontSize: "13px",
    color: "#2a1420",
    background: "#FDF6F9",
    marginBottom: "6px",
  },
  editTextarea: {
    width: "100%",
    border: "1px solid #fce8f1",
    borderRadius: "8px",
    padding: "7px 10px",
    fontSize: "13px",
    color: "#2a1420",
    background: "#FDF6F9",
    resize: "vertical",
    minHeight: "60px",
    fontFamily: "inherit",
    marginBottom: "8px",
  },
  editBtns: {
    display: "flex",
    gap: "6px",
  },
  btnGuardar: {
    fontSize: "11px",
    padding: "5px 12px",
    borderRadius: "8px",
    border: "none",
    background: "#E8649A",
    color: "#fff",
    fontWeight: "600",
  },
  btnCancelar: {
    fontSize: "11px",
    padding: "5px 12px",
    borderRadius: "8px",
    border: "1px solid #fce8f1",
    background: "transparent",
    color: "#C89AB0",
  },
};

export default TaskItem;