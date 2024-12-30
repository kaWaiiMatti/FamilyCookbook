import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWeatherForecast } from "./utils/apiClient";
import { useMsal } from "@azure/msal-react";

function App() {
  const [result, setResult] = useState<string>("");

  const { accounts } = useMsal();

  useEffect(() => {
    if (!accounts.length) {
      return;
    }
    getWeatherForecast().then((text) => setResult(text));
  }, [accounts]);

  return (
    <>
      <h1 className="title">Weather forecast</h1>
      <p>{result}</p>
      <Link to="/hello">Go to hello</Link>
    </>
  );
}

export default App;
