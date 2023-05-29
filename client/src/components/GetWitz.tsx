import { useEffect, useState } from "react";

interface IData {
  // Hier muss die Struktur der Daten definiert werden  
  type?: string;
  setup?: string;
  punchline?: string;
  id?: number;
}

function GetWitz() {
  const [data, setData] = useState<IData | null>(null); // Zustandstyp auf IData oder null setzen

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:50000/joke");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Fehler beim Datenabruf:", error);
      }
    };
    fetchData();

    return;
  }, []);


  return <div>
    {data?.setup && <p>{data?.setup}</p>}
    {data?.punchline && <p>{data?.punchline}</p>}
    </div>;
}

export default GetWitz;
