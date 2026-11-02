import { Router } from "express";
import { pool } from "./db.js";
import { searchSpotify, getAlbum, getTrack } from "./spotify.js";

const router = Router();

// gets albums/tracks from spotify using search query
router.get("/search", async (req, res) => {
  const q = (req.query.q ?? "").trim();
  if (!q) return res.status(400).json({ error: "type something to search for" });

  res.json(await searchSpotify(q));
});

// saves album
async function saveAlbum(a) {
  await pool.query(
    "insert into albums (id, name, artist, image_url, release_date) " +
      "values ($1, $2, $3, $4, $5) on conflict (id) do nothing",
    [a.id, a.name, a.artist, a.image_url, a.release_date]
  );
}

// saves track
async function saveTrack(t) {
  await saveAlbum(t.album);
  await pool.query(
    "insert into tracks (id, album_id, name, artist, image_url) " +
      "values ($1, $2, $3, $4, $5) on conflict (id) do nothing",
    [t.id, t.album.id, t.name, t.artist, t.image_url]
  );
}


// gets a single album or track by id, along with all reviews and the average rating
router.get("/items/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  if (type !== "album" && type !== "track") {
    return res.status(400).json({ error: "type must be album or track" });
  }

  const table = type === "album" ? "albums" : "tracks";
  const column = type === "album" ? "album_id" : "track_id";

  const found = await pool.query("select * from " + table + " where id = $1", [id]);
  let item = found.rows[0];

  // if not saved in our database yet, get it from spotify and save it
  if (!item) {
    try {
      item = type === "album" ? await getAlbum(id) : await getTrack(id);
    } catch {
      return res.status(404).json({ error: "could not find that " + type });
    }
    if (type === "album") await saveAlbum(item);
    else await saveTrack(item);
  }

  // get all reviews for this album/track, along with the username of the reviewer
  const result = await pool.query(
    "select r.id, r.rating, r.body, r.created_at, u.username " +
      "from reviews r join users u on u.id = r.user_id " +
      "where r." + column + " = $1 order by r.created_at desc",
    [id]
  );

  const reviews = result.rows.map((r) => ({ ...r, rating: Number(r.rating) }));

  // calculate the average rating 
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  const average = reviews.length ? Math.round((total / reviews.length) * 10) / 10 : null;

  res.json({ item, average, count: reviews.length, reviews });
});

export default router;
