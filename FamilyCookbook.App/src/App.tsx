import { useEffect, useState } from "react";
import { getUnits } from "./utils/apiClient";
import { Unit } from "./interfaces.ts";

function App() {
  const [result, setResult] = useState<Unit[] | null>(null);

  useEffect(() => {
    getUnits().then((text) => setResult(text));
  }, []);

  return (
    <>
      <h1 className="title">Temporary main page</h1>
      {result && result.map((unit: Unit) => <p key={unit.id}>{unit.id} {unit.name} ({unit.abbreviation})</p>)}
    </>
  );
}

export default App;
