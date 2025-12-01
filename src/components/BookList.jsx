import BookCard from "./BookCard";

function BookList({ books, onFavoriteClick, isFavorite }) {
  if (!books || books.length === 0) {
    return <p>Fant ingen bøker.</p>;
  }

  return (
    <div className="book-list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onFavoriteClick={onFavoriteClick}
          isFavorite={isFavorite(book.id)}
        />
      ))}
    </div>
  );
}

export default BookList;
