import { useEffect, useState } from "react";
import List from "./components/List/List";

export default function App() {

  const [pressed, setPressed] = useState(false);

  return(
    <>
      <h1>
        yeah
      </h1>
      <div>
        this is a thing now
      </div>
      <List />
      <code>{JSON.stringify(localStorage)}</code>
      <button
        onClick={() => {
          localStorage.clear();
          setPressed(true); 
        }}
      >
        <code>
          {
          pressed
          ? "deleted!" 
          : "delete localstorage"
          }
        </code>
      </button>
    </>
    
  )
}