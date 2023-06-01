import { useEffect, useState } from "react";
import React from "react";

interface IData {
  type?: string;
  setup?: string;
  punchline?: string;
  id?: number;
}

// GetWitz component
function GetWitz() {
  const [data, setData] = useState<IData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // get the joke from the backend
  useEffect(() => {
    // fetch the data from the backend
    const fetchData = async () => {
      const response = await fetch("http://localhost:50000/joke");
      try {
        // if there is an error, set the error message
        if (!response.ok) {
          throw new Error("Fehler beim Datenabruf: " + response.status);
        }
        // if there is a response, set the data to the response data
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        // if there is an error, set the error message
        setError("Fehler beim Datenabruf");
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
