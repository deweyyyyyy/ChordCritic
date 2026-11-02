import { useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../api";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  async function handleSearch(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(API + "/api/search?q=" + encodeURIComponent(query));
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Search failed");
        return;
      }
      setResults(data);
    } catch {
      setError("Could not reach the server. Is it running?");
    }
  }

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch} className="search-form">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search albums or tracks"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error">{error}</p>}

      {results && (
        <>
          <ResultList title="Albums" type="album" items={results.albums} />
          <ResultList title="Tracks" type="track" items={results.tracks} />
        </>
      )}
    </div>
  );
}

function ResultList({ title, type, items }) {
  return (
    <section>
      <h2>{title}</h2>
      {items.length === 0 && <p>No {title.toLowerCase()} found.</p>}

      <ul className="results">
        {items.map((item) => (
          <li key={item.id}>
            <Link to={"/item/" + type + "/" + item.id}>
              {item.image_url && <img src={item.image_url} alt="" width="56" height="56" />}
              <span>
                <strong>{item.name}</strong>
                <br />
                {item.artist}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
