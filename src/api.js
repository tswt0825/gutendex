const BASE_URL = "https://gutendex.com/books";

export async function searchBooks(query, page = 1) {
  const url = `${BASE_URL}?search=${encodeURIComponent(query)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Kunne ikke hente bøker");
  return res.json(); // { results, next, previous, ... }
}

export async function getBooksByTopic(topic, page = 1) {
  const url = `${BASE_URL}?topic=${encodeURIComponent(topic)}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Kunne ikke hente bøker for denne kategorien");
  return res.json();
}

export async function getBookById(id) {
  const url = `${BASE_URL}/${id}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Kunne ikke hente bokdetaljer");
  return res.json();
}
