import { useEffect, useState } from "react";


interface IData {
    // Hier muss die Struktur der Daten definiert werden
    id: number
    name: string
}

function getWitz(){

    const [data, setData] = useState<IData | null>(null); // Zustandstyp auf IData oder null setzen

    useEffect (() => {
        const fetchData = async () => {
          try {
            const response = await fetch('localhost:50000');
            const jsonData = await response.json();
            setData(jsonData);
          } catch (error) {
            console.error('Fehler beim Datenabruf:', error);
          }
        };
        fetchData();

        // Rückgabe einer "Destructor"-Funktion, um das Aufräumen zu ermöglichen (in diesem Fall nicht notwendig)
        return () => {};
      }, []);
    return (
        <div>
        {data ? (
          <div>
            <p>{JSON.stringify(data, null, 2)}</p>
          </div>
        ) : (
          <p>Lade Daten...</p>
        )}
      </div>
    );
        }




export default getWitz;