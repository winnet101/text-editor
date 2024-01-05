import List from "./components/List/List";

export default function App() {
  return (
    <>
      <h1>
        yeah
      </h1>
      <div>
        this is a thing now
      </div>
      <List index={0} />
      <List index={1} />
      <button
        onClick={() => {
          localStorage.clear();
        }}
      >
        <code>
          clear localstorage
        </code>
      </button>
    </>

  )
}