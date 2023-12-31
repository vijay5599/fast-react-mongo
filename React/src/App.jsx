import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./components/TodoList";

function App() {
  const [todoList, setTodoList] = useState([{}]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  //POST todo
  const addTodo = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/todo", {
        title: title,
        description: desc,
      })
      .then((res) => {
        console.log(res);
      });
    setTitle("");
    setDesc("");
  };

  useEffect(() => {
    axios.get("http://localhost:8000/api/todo").then((res) => {
      setTodoList(res.data);
    });
  });
  return (
    <div
      className="App list-group-item justify-content-center align-items-center"
      style={{
        width: "400px",
        backgroundColor: "white",
        marginTop: "15px",
        alignItems: "center",
        fontFamily: "cursive",
      }}
    >
      <h1 className="card text-white bg-primary mb-1"> Task Manager</h1>
      <h6 className="card text-white bg-primary mb-3">
        FastAPI - React - MongoDB
      </h6>
      <div className="card-body">
        <h5 className="card text-white bg-dark mb-3">Add Your Task</h5>
        <span className="card-text">
          <input
            className="mb-2 form-control titleIn"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="mb-2 form-control desIn"
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <button
            className="btn btn-outline-primary mx-2 mb-3"
            style={{ borderRadius: "50px", fontWeight: "bold" }}
            onClick={addTodo}
          >
            Add Task
          </button>
        </span>
        <h5 className="card text-white bg-dark mb-3">Your Tasks</h5>
        <div>
          <TodoList todoList={todoList} />
        </div>
      </div>
    </div>
  );
}

export default App;
