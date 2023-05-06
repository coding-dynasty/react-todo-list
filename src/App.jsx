import { useEffect, useState } from "react";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";
import db from "../firebaseConfig";
import "./App.scss";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ text: '' })
  const [newTask, setNewTask] = useState('')

  useEffect(() => {
    const getData = async () => {
      const querySnapshot = await getDocs(query(collection(db, "tasks"), orderBy("date", "desc")));
      setTasks(querySnapshot.docs.map((doc) => doc.data()))
    }

    getData()
  }, [newTask])

  const handleInputChange = (event) => {
    const randomNumber = Math.random() * 1000000000
    setTask({ id: randomNumber, text: event.target.value, date: new Date() });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (task.text) {
      setNewTask(task)
      await addDoc(collection(db, "tasks"), task);
      setTask({ text: '' })
    }
  };


  const handleDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };


  return (
    <div className="App">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter task"
            value={task.text}
            onChange={handleInputChange}
            maxLength={20}

          />
          <button type="submit">Add</button>
        </form>
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.date}>
              <span>{task.text}</span>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
