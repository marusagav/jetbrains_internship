import Task from "./Task";

export default function TaskList({ tasks, setTasks }) {
  const toggleTask = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "pending" ? "done" : "pending" }
          : t
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const editTask = (id, newTitle) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title: newTitle } : t)));
  };

  // Seřadíme úkoly: pending nahoře, done dole
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.status === b.status) return 0;
    return a.status === "done" ? 1 : -1;
  });

  return (
    <div className="task-list">
      {sortedTasks.map((t) => (
        <Task
          key={t.id}
          task={t}
          onToggle={() => toggleTask(t.id)}
          onDelete={() => deleteTask(t.id)}
          onEdit={(newTitle) => editTask(t.id, newTitle)}
        />
      ))}
    </div>
  );
}
