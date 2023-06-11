import { useState, useEffect } from "react";

// Interfaces for the RSS-Data from the backend
// It is a Array consisting of 3 rss articles as json objects

interface RSSArticle {
    title: string;
    link: string;
    pubDate: string;
}

function RSSPanel() {

    // State for the RSS-Data
    const [data, setData] = useState<RSSArticle[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [rssURL, setRssURL] = useState("");

    // Get the RSS-Data from the backend
    useEffect(() => {
        // Fetch the data from the backend
        const fetchData = async () => {
            const response = await fetch("http://localhost:50000/rss");
            try {
                // If there is an error, set the error message
                if (!response.ok) {
                    throw new Error("Fehler beim Datenabruf: " + response.status);
                }
                // If there is a response, set the data to the response data
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                // If there is an error, set the error message
                setError("Fehler beim Datenabruf");
            }
        };
        fetchData();

        return;
    }, []);

    // Handle the input change
    const handleRssURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRssURL(event.target.value);

    };

    // Return the 3 RSS-Articles
    return (
        <div>
            <input type="text" value={rssURL} onChange={handleRssURLChange} />

            {error ? (
                <p>{error}</p>
            ) : (
                <>
                    <div className="rss-article">
                        <div className="rss-title">
                            {data?.[0] && <p>{data?.[0].title}</p>}
                        </div>
                        <div className="rss-link">
                            {data?.[0] && <p>{data?.[0].link}</p>}
                        </div>
                        <div className="rss-date">
                            {data?.[0] && <p>{data?.[0].pubDate}</p>}
                        </div>
                    </div>
                    <br />
                    <div className="rss-article">
                        <div className="rss-title">
                            {data?.[1] && <p>{data?.[1].title}</p>}
                        </div>
                        <div className="rss-link">
                            {data?.[1] && <p>{data?.[1].link}</p>}
                        </div>
                        <div className="rss-date">
                            {data?.[1] && <p>{data?.[1].pubDate}</p>}
                        </div>
                    </div>
                    <br />
                    <div className="rss-article">
                        <div className="rss-title">
                            {data?.[2] && <p>{data?.[2].title}</p>}
                        </div>
                        <div className="rss-link">
                            {data?.[2] && <p>{data?.[2].link}</p>}
                        </div>
                        <div className="rss-date">
                            {data?.[2] && <p>{data?.[2].pubDate}</p>}
                        </div>
                    </div>
                </>
            )}
        </div>
    );

}

export default RSSPanel;
