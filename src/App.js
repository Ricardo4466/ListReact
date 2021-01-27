import "./App.css";
import { useState, useEffect } from "react";

function TodoList() {
  const [taskList, setTaskList] = useState([]);
  const [inputTask, setInputTask] = useState({id:"", description:""});

window.addEventListener("beforeunload", () => {
  localStorage.setItem("lista", JSON.stringify(taskList));
});

useEffect(() =>{
  setTaskList(JSON.parse(localStorage.getItem("lista")) || [])
},[]);
  
  const handleInsert = (description) => {
    const newId =
      taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1;

    const task = 
    {
      id: newId,
      description,
    };

    setTaskList([...taskList, task]);
  };


  const handleRemove = (id) => 
  {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const handleEdit = (task) => 
  {
   setInputTask(task);
  };

  const handleSaveEdit = () => 
  {
    setTaskList(taskList.map(task => task.id === inputTask.id ? inputTask : task));
  }

  return (
    <div className="container">
      <Form handleInsert={handleInsert} newTask={inputTask} setNewTask={setInputTask} handleSaveEdit={handleSaveEdit}/>
      <hr />
      <List list={taskList} handleRemove={handleRemove} handleEdit={handleEdit}/>
    </div>
  );
}

function Form({ handleInsert, newTask, setNewTask, handleSaveEdit }) {
  

  const handleNewTask = (e) => {
    setNewTask({...newTask, description: e.target.value});
  };
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if(newTask.id === "")
    {
      handleInsert(newTask.description);
    }
    else
    {
      handleSaveEdit();
    }

    setNewTask({id:"", description:""});
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <input type="text" value={newTask.description} onChange={handleNewTask} required/>
      <button>OK!</button>
    </form>
  );
}

function List({ list, handleRemove, handleEdit }) {
  return (
    <section>
      {list.length === 0 && "voce não tem tarefas"}
      {list.map((item) => (
        <Item key={item.id} task={item} handleRemove={handleRemove} handleEdit={handleEdit} />
      ))}
    </section>
  );
}

function Item({ task,handleRemove, handleEdit}) {
  return (
    <article className="item">
      <p>
        {task.id} - {task.description}
      </p>
      <div>
        <span onClick={() => handleRemove(task.id)}>&times;</span>
        <span style={{ fontSize: 25 }} onClick={() => handleEdit(task)}>&#9998;</span>
      </div>
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
