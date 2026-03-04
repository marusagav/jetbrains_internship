import { useState } from "react";
import styles from "../styles/Task.module.scss";

export default function Task({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleEdit = (e) => {
    e.stopPropagation();
    if (isEditing) onEdit(editValue);
    setIsEditing(!isEditing);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDelete();
  };

  return (
    <div
      className={`${styles.task} ${task.status === "done" ? styles.done : ""}`}
      onClick={onToggle}
    >
      {isEditing ? (
        <input
          className={styles.input}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span>{task.title}</span>
      )}
      <div className={styles.actions}>
        <button onClick={handleEdit}>{isEditing ? "Save" : "Edit"}</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}