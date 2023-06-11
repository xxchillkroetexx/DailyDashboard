import { useState, useEffect } from "react";

interface RSSArticle {
  title: string;
  link: string;
  pubDate: string;
}

function RSSPanel() {
  const [data, setData] = useState<RSSArticle[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rssURL, setRssURL] = useState<string>("https://www.tagesschau.de/infoservices/alle-meldungen-100~rss2.xml");

  const fetchData = async (url: string) => {
    try {
      const response = await fetch(`/RSS/${encodeURIComponent(url)}`);
      if (!response.ok) {
        throw new Error("Fehler beim Datenabruf: " + response.status);
      }
      const jsonData = await response.json();
      setData(jsonData);
      setError(null);
    } catch (error) {
      setData(null);
      setError("Bitte geben Sie eine gültige RSS-URL ein.");
    }
  };

  useEffect(() => {
    fetchData(rssURL);
  }, []);

  const handleRssURLChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value.trim();
    setRssURL(url);
    if (url) {
      fetchData(url);
    } else {
      setData(null);
      setError(null);
    }
  };

  return (
    <div>
      <input type="text" value={rssURL} onChange={handleRssURLChange} />

      {error ? (
        <p>{error}</p>
      ) : (
        <>
          {data?.slice(0, 3).map((article) => (
            <div className="rss-article" key={article.link}>
              <div className="rss-title">
                <p>{article.title}</p>
              </div>
              <div className="rss-link">
                <p>{article.link}</p>
              </div>
              <div className="rss-date">
                <p>{article.pubDate}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default RSSPanel;
