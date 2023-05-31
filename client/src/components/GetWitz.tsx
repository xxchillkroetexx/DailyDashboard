import { useEffect, useState } from "react";
import React from "react";


interface IData {
  type?: string;
  setup?: string;
  punchline?: string;
  id?: number;
}

function GetWitz() {
  const [data, setData] = useState<IData | null>(null);
  const [error, setError] = useState<string | null>(null); // Zustand für den Fehler hinzufügen

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:50000/joke");
        if (!response.ok) {
          throw new Error("Fehler beim Datenabruf: " + response.status);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();

    return;
  }, []);

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {data?.setup && <p>{data?.setup}</p>}
          {data?.punchline && <p>{data?.punchline}</p>}
        </>
      )}
    </div>
  );
}

export default GetWitz;
