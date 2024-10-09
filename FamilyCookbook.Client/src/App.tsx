import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    fetch("/weatherforecast")
      .then((response) => response.text())
      .then((text) => setResult(text));
  }, []);

  return (
    <>
      <h2>Weatherforecast</h2>
      <p>{result}</p>
    </>
  );
}

export default App;
