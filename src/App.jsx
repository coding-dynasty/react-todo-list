import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [highlightInput, setHighlightInput] = useState(false);

  const handleInputChange = (event) => {
    setHighlightInput(false);
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (/^[a-zA-Z\s]+$/.test(inputValue)) {

      const newTask = {
        id: Date.now(),
        text: inputValue,
      };

      if (tasks.filter(task => task.text.toLowerCase() === newTask.text.toLowerCase()).length > 0) {
        setHighlightInput(true);
        alert("This task already exists!");
        return;
      }

      setHighlightInput(false);
      setTasks([...tasks, newTask]);
      setInputValue("");
    } else {
      alert("Please enter a valid task name (letters and spaces only).");
      setInputValue("");
    }
  };


  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (a.text < b.text) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a.text > b.text) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
    setTasks(sortedTasks);
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            value={inputValue}
            onChange={handleInputChange}
            pattern="^[^0-9]*$"
            maxLength={20}

            className={highlightInput ? "highlight" : ""}
          />
          <button type="submit">Add</button>
        </form>
        {tasks.length > 0 ? <div className="sort-container">
          <button onClick={handleSort}>
            {sortDirection === "asc" ? "Sort Z-A" : "Sort A-Z"}
          </button>
        </div> : null}
        <ul className="task-list">
          {tasks.length > 0 ? (
            <ul className="task-list">
              {tasks.map((task) => (
                <li key={task.id}>
                  <span>{task.text}</span>
                  <button onClick={() => handleDelete(task.id)}>Delete</button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="no-tasks-placeholder">
              <p >You have no tasks yet.</p>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
