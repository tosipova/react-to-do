import React from 'react';
import './App.css';


const TodoForm = ({ addTodo }) => {

  const [value, setValue] = React.useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!value) {
      return;
    }
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} className="todo-form">
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

const Todo = ({ todo, onDelete, onDone }) => {
  console.log('Render TODO')
  return (
    <div className="todo">
      {todo.text}
      <span>
        <input type="checkbox" onClick={onDone} checked={todo.done} />
        <input type="button" onClick={onDelete} value="del" />
      </span>
    </div>
  )
}

const createTodo = ({ text, id = Math.floor(Math.random() * 100), done = false }) => {
  return { text, id, done }
}
const App = () => {
  const initialTodo = createTodo({ text: "Clean table", done: false })
  const initialValue = [initialTodo]
  const [todos, setTodos] = React.useState(initialValue);
  const toDosMarkup = todos.map((todo, index) => (
    <Todo key={`${todo.id}`}
      todo={todo}
      onDelete={() => setTodos(todos.filter((el) => el.id !== todo.id))}
      onDone={() => {
        const foundTodo = todos.find((el) => el.id === todo.id)
        foundTodo.done = true
        console.log(foundTodo)
        const result = [...todos]
        result[index] = foundTodo
        setTodos(result)

      }
      }
    />
  ))

  console.log(toDosMarkup)
  const totalTask = todos.length
  const fulfilledTasks = todos.filter((todo) => todo.done).
  return (
    <div className="app">
      <div className="todo-heading">
        <div>Todo list,total tasks:{totalTask},fulfilled tasks:{fulfilledTasks}</div>
      </div>
      <div className="todo-list">
        {toDosMarkup}
      </div>
      <TodoForm addTodo={(value) => setTodos([...todos, createTodo({ text: value })])} />
    </div>
  );
}
export default App