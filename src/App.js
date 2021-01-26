import "./App.css";
import { useState } from "react";

function TodoList() {
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      description: "Estudar Inglês",
    },
  ]);

  const handleInsert = (description) => {
    const newId =
      taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1;

    const task = {
      id: newId,
      description,
    };

    setTaskList([...taskList, task]);
  };

  const handleRemove = (id) => {
    setTaskList(taskList.filter((task) => task.id !== id));
    
  };

  return (
    <div className="container">
      <Form handleInsert={handleInsert} />
      <hr />
      <List list={taskList} handleRemove={handleRemove}/>
    </div>
  );
}

function Form({ handleInsert }) {
  const [newTask, setnewTask] = useState("");

  const handleNewTask = (e) => {
    setnewTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleInsert(newTask);

    setnewTask("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" value={newTask} onChange={handleNewTask} />
      <button>OK!</button>
    </form>
  );
}

function List({ list, handleRemove }) {
  return (
    <section>
      {list.length === 0 && "voce não tem tarefas"}
      {list.map((item) => (
        <Item task={item} handleRemove={handleRemove} />
      ))}
    </section>
  );
}

function Item({ task,handleRemove }) {
  return (
    <article className="item">
      <p>
        {task.id} - {task.description}
      </p>
      <span onClick={() => handleRemove(task.id)}>&times;</span>
    </article>
  );
}

function App() {
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;
