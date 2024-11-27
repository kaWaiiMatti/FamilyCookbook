import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function App() {
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:7243/weatherforecast")
      .then((response) => response.text())
      .then((text) => setResult(text));
  }, []);

  return (
    <>
      <h1 className="title">Weatherforecast</h1>
      <p>{result}</p>
      <Link to="/hello">Go to hello</Link>
    </>
  );
}

export default App;
