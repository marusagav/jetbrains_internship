import { useState, useEffect } from "react";
import Button from "./components/Button";
import TaskList from "./components/TaskList";
import "./styles/globals.scss";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Learn React", status: "pending" },
          { id: 2, title: "Setup CSS pipeline", status: "done" },
        ];
  });

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      title: "New Task",
      status: "pending",
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="app-container">
      <h1>Mini Task Tracker</h1>
      <Button onClick={addTask}>Add Task</Button>
      <h2>
        Total: {tasks.length} | Done:{" "}
        {tasks.filter((t) => t.status === "done").length}
      </h2>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default App;
