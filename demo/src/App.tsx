import { Cases } from "./Cases";

function App() {
  return (
    <div className="App" style={{ height: "100%" }}>
      <div
        style={{
          height: "100%",
          width: "66%",
        }}
      >
        <div
          style={{
            margin: 5,
            padding: 5,
            border: "solid black 1px",
            background: "white",
          }}
        >
          <span style={{ fontWeight: "bold" }}>use-detect-rerender-cause</span>
          <span style={{ marginLeft: 5 }}>| williamsease 2024 |</span>
          <a
            style={{ marginLeft: 5 }}
            href="https://github.com/williamsease/use-detect-rerender-cause"
          >
            repository
          </a>
          <span> |</span>
          <a style={{ marginLeft: 5 }} href="https://williamsease.github.io">
            homepage
          </a>
        </div>
        <Cases />
      </div>
    </div>
  );
}

export default App;
