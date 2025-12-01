import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBookById } from "../api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { useFavorites } from "../hooks/useFavorites";

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    async function fetchBook() {
      setLoading(true);
      setError("");
      try {
        const data = await getBookById(id);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!book) return null;

  const authors =
    book.authors?.map((a) => a.name).join(", ") || "Ukjent forfatter";
  const cover = book.formats?.["image/jpeg"];
  const language = book.languages?.join(", ");
  const downloadCount = book.download_count;
  const topic = book.subjects?.[0];
  const textLink =
    book.formats?.["text/html; charset=utf-8"] ||
    book.formats?.["text/plain; charset=utf-8"] ||
    book.formats?.["application/epub+zip"];

  const handleFavoriteClick = () => {
    if (isFavorite(book.id)) {
      removeFavorite(book.id);
    } else {
      addFavorite(book);
    }
  };

  return (
    <section className="details">
      {cover && <img src={cover} alt={book.title} />}
      <div>
        <h2>{book.title}</h2>
        <p>
          <strong>Forfatter:</strong> {authors}
        </p>
        <p>
          <strong>Nedlastinger:</strong> {downloadCount}
        </p>
        <p>
          <strong>Kategori:</strong> {topic}
        </p>
        <p>
          <strong>Språk:</strong> {language}
        </p>

        {textLink && (
          <p>
            <a href={textLink} target="_blank" rel="noreferrer">
              Les / last ned boka
            </a>
          </p>
        )}

        <button onClick={handleFavoriteClick}>
          {isFavorite(book.id)
            ? "Fjern fra favoritter"
            : "Legg til i favoritter"}
        </button>
      </div>
    </section>
  );
}

export default BookDetails;
