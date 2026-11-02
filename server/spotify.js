import "dotenv/config";

let token = null;
let tokenExpires = 0;

// gets spotify access token, caching it until it expires
async function getToken() {
  if (token && Date.now() < tokenExpires) return token;

  const id = process.env.SPOTIFY_CLIENT_ID;
  const secret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!id || !secret) {
    throw new Error("SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in server/.env");
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: "Basic " + Buffer.from(id + ":" + secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error("Could not get a Spotify token");

  const data = await res.json();
  token = data.access_token;
  tokenExpires = Date.now() + (data.expires_in - 60) * 1000;
  return token;
}

// gets a response from the spotify api, using our access token
async function spotifyGet(path) {
  const res = await fetch("https://api.spotify.com/v1" + path, {
    headers: { Authorization: "Bearer " + (await getToken()) },
  });
  if (!res.ok) throw new Error("Spotify request failed with status " + res.status);
  return res.json();
}


function cleanAlbum(a) {
  return {
    id: a.id,
    name: a.name,
    artist: a.artists?.[0]?.name ?? "Unknown artist",
    image_url: a.images?.[0]?.url ?? null,
    release_date: a.release_date ?? null,
  };
}

function cleanTrack(t) {
  return {
    id: t.id,
    name: t.name,
    artist: t.artists?.[0]?.name ?? "Unknown artist",
    image_url: t.album?.images?.[0]?.url ?? null,
    album: cleanAlbum(t.album),
  };
}

// search for albums and tracks on spotify
export async function searchSpotify(query) {
  const data = await spotifyGet(
    "/search?type=album,track&limit=10&q=" + encodeURIComponent(query)
  );
  return {
    albums: data.albums.items.filter(Boolean).map(cleanAlbum),
    tracks: data.tracks.items.filter(Boolean).map(cleanTrack),
  };
}

export async function getAlbum(id) {
  return cleanAlbum(await spotifyGet("/albums/" + encodeURIComponent(id)));
}

export async function getTrack(id) {
  return cleanTrack(await spotifyGet("/tracks/" + encodeURIComponent(id)));
}
