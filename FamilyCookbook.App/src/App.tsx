import { useEffect, useState } from "react";
import { getUnits } from "./utils/apiClient";
import { useMsal } from "@azure/msal-react";
import { Unit } from "./interfaces.ts";

function App() {
  const [result, setResult] = useState<Unit[] | null>(null);

  const { accounts } = useMsal();

  useEffect(() => {
    getUnits().then((text) => setResult(text));
  }, [accounts]);

  return (
    <>
      <h1 className="title">Temporary main page</h1>
      {result && result.map((unit: Unit) => <p key={unit.id}>{unit.id} {unit.name} ({unit.abbreviation})</p>)}
    </>
  );
}

export default App;
