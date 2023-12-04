import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
  return (
    <div>
      <ul>
        {props.todoList.map((todo) => (
          <TodoItem todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
