import { Cases } from "./Cases";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <div
        style={{
          height: "100%",
          border: "solid black 1px",
          background: "lightgrey",
        }}
      >
        <Cases />
      </div>
    </div>
  );
}

export default App;
