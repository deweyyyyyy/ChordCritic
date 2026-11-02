import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../api";

export default function ItemPage() {
  const { type, id } = useParams(); // read album/track and the id from url
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  // load album/track from the server whenever url changeds
  useEffect(() => {
    setData(null);
    setError("");

    fetch(API + "/api/items/" + type + "/" + id)
      .then(async (res) => {
        const body = await res.json();
        if (!res.ok) throw new Error(body.error);
        return body;
      })
      .then(setData)
      .catch((err) => setError(err.message || "Could not load this page"));
  }, [type, id]);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Loading...</p>;

  const { item, average, count, reviews } = data;

  return (
    <div>
      <div className="item-header">
        {item.image_url && <img src={item.image_url} alt="" width="160" height="160" />}
        <div>
          <h1>{item.name}</h1>
          <p>{item.artist}</p>
          <p className="average">
            {average === null
              ? "No ratings yet"
              : "★ " + average + " / 5 (" + count + (count === 1 ? " review)" : " reviews)")}
          </p>
        </div>
      </div>

      {/* the star rating form and the written review stuff goes here */}

      <h2>Reviews</h2>
      {reviews.length === 0 && <p>No reviews yet. Be the first to review this {type}.</p>}

      {reviews.map((review) => (
        <div key={review.id} className="review">
          <strong>{review.username}</strong> <span>★ {review.rating}</span>
          {review.body && <p>{review.body}</p>}
        </div>
      ))}
    </div>
  );
}
