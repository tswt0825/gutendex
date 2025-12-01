import { Link } from "react-router-dom";

function BookCard({ book, onFavoriteClick, isFavorite }) {
  const authors =
    book.authors?.map((a) => a.name).join(", ") || "Ukjent forfatter";
  const cover = book.formats?.["image/jpeg"];
  const language = book.languages?.join(", ");

  return (
    <div className="book-card">
      <Link to={`/books/${book.id}`}>
        {cover && <img src={cover} alt={book.title} />}
        <h3>{book.title}</h3>
      </Link>
      <p>{authors}</p>
      <p>Språk: {language}</p>
      <button onClick={() => onFavoriteClick(book)}>
        {isFavorite ? "Fjern fra favoritter" : "Legg til favoritt"}
      </button>
    </div>
  );
}

export default BookCard;
