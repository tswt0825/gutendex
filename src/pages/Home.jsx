import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchBooks } from "../api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import BookList from "../components/BookList";
import { useFavorites } from "../hooks/useFavorites";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("search") || "harry";
  const page = Number(searchParams.get("page") || 1);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      setError("");
      try {
        const data = await searchBooks(query, page);
        setBooks(data.results);
        setHasNext(Boolean(data.next));
        setHasPrev(Boolean(data.previous));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [query, page]);

  const handleFavoriteClick = (book) => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  const goToPage = (newPage) => {
    setSearchParams({ search: query, page: newPage });
  };

  return (
    <section>
      <h2>Søkeresultater for: {query}</h2>
      <ErrorMessage message={error} />
      {loading ? (
        <Loading />
      ) : (
        <>
          <BookList
            books={books}
            onFavoriteClick={handleFavoriteClick}
            isFavorite={isFavorite}
          />
          <div className="pagination">
            <button
              disabled={!hasPrev || page <= 1}
              onClick={() => goToPage(page - 1)}
            >
              Forrige
            </button>
            <span>Side {page}</span>
            <button disabled={!hasNext} onClick={() => goToPage(page + 1)}>
              Neste
            </button>
          </div>
        </>
      )}
    </section>
  );
}

export default Home;
