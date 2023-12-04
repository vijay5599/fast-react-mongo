import axios from "axios";
import React, { useEffect } from "react";

function TodoItem(props) {
  const deleteHandler = (title) => {
    axios.delete(`http://localhost:8000/api/todo/${title}`).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    // fetch data here
  }, [props]);
  return (
    <div>
      <p>
        <span>{props.todo.title} : </span> {props.todo.description}
        <button
          className="btn btn-outline-danger my-2 mx-2"
          onClick={() => deleteHandler(props.todo.title)}
        >
          X
        </button>
      </p>
    </div>
  );
}

export default TodoItem;
