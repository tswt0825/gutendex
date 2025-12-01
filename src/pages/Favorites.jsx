import { useFavorites } from "../hooks/useFavorites";
import BookList from "../components/BookList";

function Favorites() {
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  const handleFavoriteClick = (book) => {
    removeFavorite(book.id);
  };

  return (
    <section>
      <h2>⭐ Favorittbøker</h2>
      <BookList
        books={favorites}
        onFavoriteClick={handleFavoriteClick}
        isFavorite={isFavorite}
      />
    </section>
  );
}

export default Favorites;
