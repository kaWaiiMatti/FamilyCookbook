import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
      <Link to="/hello">Go to hello</Link>
    </>
  );
}

export default App;
