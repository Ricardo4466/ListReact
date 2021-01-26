import "./App.css";
import { useState } from "react";

function Header(props) {
  return (
    <header>
      <p>Hello World Senaiers {props.name}</p>
      <button onClick={props.click}> Trocar usúario </button>
      <hr />
    </header>
  );
}

function Form() {
  const [nome, setNome] = useState("");

  const handleNome = (e) => {
    setNome(e.target.value);
  };

  return (
    <>
      <p>{nome}</p>
      <input
        type="text"
        placeholder="Digite seu nome:"
        value={nome}
        onChange={handleNome}
      />
    </>
  );
}

function App() {
  const [user, setUser] = useState("Ricardo");

  const handleClick = () => {
    if (user === "Ricardo") setUser("ricardinho");
    else setUser("Ricardo");
  };

  return (
    <div>
      <Header name="Ricardo" click={handleClick} />
      <p>My React app</p>
      <p>Nome do usúario: {user}</p>
      <hr />
      <Form />
    </div>
  );
}

export default App;
